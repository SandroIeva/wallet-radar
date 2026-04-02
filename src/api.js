const BASE = '/api/etherscan'

async function call(params) {
  const url = `${BASE}?${new URLSearchParams({ ...params, _t: Date.now() })}`
  const r = await fetch(url, { cache: 'no-store' })
  const text = await r.text()
  try {
    return JSON.parse(text)
  } catch {
    console.error('Parse error:', text.slice(0, 200))
    return null
  }
}

export async function fetchLatestBlock() {
  try {
    const d = await call({ module: 'proxy', action: 'eth_blockNumber' })
    if (!d || !d.result) return null
    return parseInt(d.result, 16)
  } catch(e) { console.error('fetchLatestBlock:', e); return null }
}

export async function fetchBalance(address) {
  try {
    const d = await call({ module: 'account', action: 'balance', address })
    if (!d || !d.result) return null
    return (parseFloat(d.result) / 1e18).toFixed(2)
  } catch(e) { console.error('fetchBalance:', e); return null }
}

export async function fetchWalletTxs(address) {
  try {
    const d = await call({ module: 'account', action: 'txlist', address, sort: 'desc', offset: '10', page: '1' })
    if (!d) return []
    return d.status === '1' ? d.result : []
  } catch(e) { console.error('fetchWalletTxs:', e); return [] }
}
