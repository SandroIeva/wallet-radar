# Wallet Radar

Ethereum Wallet Tracker — Live On-Chain Daten via Etherscan API.

## Setup auf Vercel

1. Repo auf GitHub pushen
2. Auf vercel.com importieren
3. Environment Variable setzen: `ETHERSCAN_API_KEY` = dein Key
4. Deploy — fertig.

## Wallets anpassen

Öffne `index.html` und bearbeite das `WALLETS` Array:

```js
const WALLETS = [
  { address: '0x...', label: 'Mein Wallet' },
]
```

Built by [sandroieva.com](https://sandroieva.com)
