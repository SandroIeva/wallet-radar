const BASE = '/api/etherscan'

export async function fetchLatestBlock() {
  try {
    const r = await fetch(`${BASE}?module=proxy&action=eth_blockNumber&_t=${Date.now()}`)
    if (!r.ok) return null
    const d = await r.json()
    return parseInt(d.result, 16)
  } catch { return null }
}

export async function fetchBalance(address) {
  try {
    const r = await fetch(`${BASE}?module=account&action=balance&address=${address}&_t=${Date.now()}`)
    if (!r.ok) return null
    const d = await r.json()
    return d.result ? (parseFloat(d.result) / 1e18).toFixed(2) : null
  } catch { return null }
}

export async function fetchWalletTxs(address) {
  try {
    const r = await fetch(`${BASE}?module=account&action=txlist&address=${address}&sort=desc&offset=10&page=1&_t=${Date.now()}`)
    if (!r.ok) return null
    const d = await r.json()
    return d.status === '1' ? d.result : []
  } catch { return null }
}
