export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { module, action, address, sort, offset, page } = req.query
  const apiKey = process.env.VITE_ETHERSCAN_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const params = new URLSearchParams({
    module, action, apikey: apiKey,
    ...(address && { address }),
    ...(sort && { sort }),
    ...(offset && { offset }),
    ...(page && { page }),
    startblock: '0',
    endblock: '99999999',
  })

  try {
    const response = await fetch(`https://api.etherscan.io/api?${params}`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Etherscan' })
  }
}
