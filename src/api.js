const BASE = 'https://api.etherscan.io/api'

export async function fetchLatestBlock(apiKey) {
  if (!apiKey) return null
  try {
    const r = await fetch(`${BASE}?module=proxy&action=eth_blockNumber&apikey=${apiKey}`)
    const d = await r.json()
    return parseInt(d.result, 16)
  } catch { return null }
}

export async function fetchBalance(address, apiKey) {
  if (!apiKey) return null
  try {
    const r = await fetch(`${BASE}?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`)
    const d = await r.json()
    return d.result ? (parseFloat(d.result) / 1e18).toFixed(2) : null
  } catch { return null }
}

export async function fetchWalletTxs(address, apiKey) {
  if (!apiKey) return null
  try {
    const r = await fetch(`${BASE}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`)
    const d = await r.json()
    return d.status === '1' ? d.result : []
  } catch { return null }
}
