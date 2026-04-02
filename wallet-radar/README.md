# Wallet Radar

Ethereum Wallet Tracker — Live On-Chain Daten via Etherscan API.

![Light Theme Dashboard](https://img.shields.io/badge/theme-light-f5f4f0?style=flat)
![Ethereum](https://img.shields.io/badge/chain-ethereum-627EEA?style=flat)

---

## Setup

### 1. Repo klonen

```bash
git clone https://github.com/dein-username/wallet-radar.git
cd wallet-radar
npm install
```

### 2. API Key eintragen

```bash
cp .env.example .env
```

Dann `.env` öffnen und deinen [Etherscan API Key](https://etherscan.io/myapikey) eintragen:

```
VITE_ETHERSCAN_API_KEY=dein_key_hier
```

### 3. Lokal starten

```bash
npm run dev
```

---

## Wallets anpassen

Öffne `src/wallets.js` und trag beliebige Ethereum-Adressen ein:

```js
export const TRACKED_WALLETS = [
  { address: '0x...', label: 'Mein Wallet' },
  // ...
]
```

---

## Deployment auf Vercel

1. Repo auf GitHub pushen
2. Auf [vercel.com](https://vercel.com) → **New Project** → Repo importieren
3. Unter **Environment Variables** eintragen:
   - Key: `VITE_ETHERSCAN_API_KEY`
   - Value: dein Etherscan Key
4. **Deploy** klicken — fertig.

> ⚠️ Trag den API Key niemals direkt in den Code ein. Immer über Environment Variables.

---

## Features

- Live Ethereum Transaktionen (alle 15s)
- ETH Balance pro Wallet
- Aktueller Block-Counter
- Responsive Design

---

Built by [sandroieva.com](https://sandroieva.com)
