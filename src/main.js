import './style.css'
import { TRACKED_WALLETS } from './wallets.js'
import { fetchLatestBlock, fetchBalance, fetchWalletTxs } from './api.js'

const seenTxs = new Set()
let txTotal = 0

const app = document.getElementById('app')
app.innerHTML = `
  <header>
    <span class="header-title">Wallet Radar</span>
    <div class="live-badge">
      <div class="live-dot"></div>
      <span class="live-label">LIVE</span>
    </div>
  </header>
  <main>
    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-label">Wallets Tracked</div>
        <div class="stat-value" id="walletCount">—</div>
        <div class="stat-sub">Ethereum Mainnet</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Transaktionen</div>
        <div class="stat-value" id="txCount">0</div>
        <div class="stat-sub">seit Seitenaufruf</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Letzter Block</div>
        <div class="stat-value" id="blockNum">—</div>
        <div class="stat-sub" id="blockTime">—</div>
      </div>
    </div>
    <div class="two-col">
      <div>
        <div class="section-label">Wallets</div>
        <div class="wallets-grid" id="walletList"><div class="placeholder">Lade…</div></div>
      </div>
      <div>
        <div class="section-label"><span>Transaktionen</span><div class="live-dot"></div></div>
        <div class="feed-wrapper" id="liveFeed"><div class="placeholder">Warte auf Transaktionen…</div></div>
      </div>
    </div>
    <div class="divider"></div>
    <footer>
      <span>ETHEREUM ON-CHAIN DATEN · ETHERSCAN API</span>
      <span>sandroieva.com</span>
    </footer>
  </main>
`

function shortAddr(addr) { return addr.slice(0,6) + '…' + addr.slice(-4) }
function formatETH(wei) {
  const eth = parseFloat(wei) / 1e18
  if (eth >= 1000) return eth.toFixed(0) + ' ETH'
  if (eth >= 1) return eth.toFixed(3) + ' ETH'
  return eth.toFixed(6) + ' ETH'
}
function timeAgo(ts) {
  const diff = Date.now()/1000 - parseInt(ts)
  if (diff < 60) return Math.floor(diff) + 's'
  if (diff < 3600) return Math.floor(diff/60) + 'm'
  return Math.floor(diff/3600) + 'h'
}
function nowTime() {
  const d = new Date()
  return [d.getHours(),d.getMinutes(),d.getSeconds()].map(n=>String(n).padStart(2,'0')).join(':')
}

async function renderWallets() {
  const list = document.getElementById('walletList')
  list.innerHTML = ''
  document.getElementById('walletCount').textContent = TRACKED_WALLETS.length
  for (const w of TRACKED_WALLETS) {
    const card = document.createElement('div')
    card.className = 'wallet-card'
    card.innerHTML = `<div class="wallet-top"><div><div style="margin-bottom:4px"><span class="wallet-id">${shortAddr(w.address)}</span></div><div class="wallet-label">${w.label}</div></div><div><div class="wallet-bal" id="bal-${w.address}">…</div><div class="wallet-bal-sub">ETH Balance</div></div></div>`
    list.appendChild(card)
    fetchBalance(w.address).then(bal => {
      const el = document.getElementById('bal-' + w.address)
      if (el) el.textContent = bal || '—'
    })
  }
}

function addFeedRow(tx, walletLabel) {
  const feed = document.getElementById('liveFeed')
  const placeholder = feed.querySelector('.placeholder')
  if (placeholder) feed.innerHTML = ''
  const isIn = tx.to && TRACKED_WALLETS.some(w => w.address.toLowerCase() === tx.to.toLowerCase())
  const row = document.createElement('div')
  row.className = 'feed-row'
  row.innerHTML = `<span class="feed-time">${nowTime()}</span><span class="feed-wallet">${walletLabel}</span><span class="${isIn?'buy':'sell'}">${isIn?'▲ IN':'▼ OUT'}</span><span class="feed-token">ETH</span><span class="feed-value">${formatETH(tx.value)}</span><span class="feed-age">${timeAgo(tx.timeStamp)} ago</span>`
  feed.insertBefore(row, feed.firstChild)
  txTotal++
  document.getElementById('txCount').textContent = txTotal
  while (feed.children.length > 60) feed.removeChild(feed.lastChild)
}

async function pollTransactions() {
  for (const wallet of TRACKED_WALLETS) {
    const txs = await fetchWalletTxs(wallet.address)
    if (!txs) continue
    for (const tx of txs.slice(0,3)) {
      if (!seenTxs.has(tx.hash) && tx.value !== '0') {
        seenTxs.add(tx.hash)
        addFeedRow(tx, wallet.label)
      }
    }
    await new Promise(r => setTimeout(r, 250))
  }
}

async function updateBlock() {
  const block = await fetchLatestBlock()
  if (block) {
    document.getElementById('blockNum').textContent = block.toLocaleString()
    document.getElementById('blockTime').textContent = new Date().toLocaleTimeString('de-DE')
  }
}

async function init() {
  await renderWallets()
  await updateBlock()
  await pollTransactions()
  setInterval(pollTransactions, 15000)
  setInterval(updateBlock, 30000)
}

init()
