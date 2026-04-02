export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-store')

  const apiKey = process.env.ETHERSCAN_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'No API key' })

  const { module, action, address, sort, offset, page } = req.query

  const params = new URLSearchParams({
    chainid: '1',
    module, action, apikey: apiKey,
    ...(address && { address }),
    ...(sort && { sort }),
    ...(offset && { offset }),
    ...(page && { page }),
    startblock: '0',
    endblock: '99999999',
  })

  try {
    const r = await fetch(`https://api.etherscan.io/v2/api?${params}`)
    const d = await r.json()
    res.status(200).json(d)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
