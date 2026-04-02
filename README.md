# Wallet Radar 🛰️

A real-time Ethereum wallet tracker that lets you monitor what the world's top crypto traders, CEOs, and institutions are buying and holding — live on-chain.

![Ethereum](https://img.shields.io/badge/chain-ethereum-627EEA?style=flat&logo=ethereum)
![Vercel](https://img.shields.io/badge/deployed-vercel-black?style=flat&logo=vercel)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

**Live Demo:** [wallet-radar-phi.vercel.app](https://wallet-radar-phi.vercel.app)

---

## Features

### 📊 Trader Dashboard
- Ranked list of wallets sorted by ETH balance
- Click any trader to expand an **accordion** with their full token holdings
- Each token shows name, symbol, amount held, and USD value
- Add or remove wallets directly in the UI — no code needed

### 🪙 Token Holdings
- Tracks all ERC-20 tokens held by each wallet
- Shows exact amounts and USD value for known tokens (USDC, USDT, WETH, WBTC, etc.)
- Data is derived from on-chain transfer history — no third-party pricing API needed

### ⚡ Live Transaction Feed
- Real-time feed of ETH transactions from all tracked wallets
- Shows direction (IN / OUT), amount, and time elapsed
- Auto-syncs every 15 seconds with a visual countdown bar

### 🔔 Browser Alerts
- Optional push notifications for transactions over 0.5 ETH
- Works natively in Chrome/Firefox — no app required
- Pause / resume sync at any time

### ⭐ Famous Traders (Pre-loaded)
One click to load verified public wallets of well-known figures:

| Name | Role | Source |
|------|------|--------|
| Vitalik Buterin | ETH Co-Founder | `vitalik.eth` |
| Brian Armstrong | Coinbase CEO | `barmstrong.eth` |
| CZ | Binance Founder | `cz binance.eth` |
| Mark Cuban | Investor | Publicly shared |
| Justin Sun | TRON Founder | `justinsun.eth` |
| Hayden Adams | Uniswap Founder | `hayden.eth` |
| Wintermute | Market Maker | Etherscan labelled |
| Jump Trading | Market Maker | Etherscan labelled |
| Binance, Kraken, Coinbase | Exchanges | Etherscan labelled |

> ⚠️ Only publicly verifiable wallet addresses are included. All wallets are publicly visible on Etherscan — this tool only reads public blockchain data.

### 🔍 ENS Lookup
- Type any `.eth` name (e.g. `hayden.eth`) in the Add Wallet form
- Click **Lookup** to automatically resolve it to a wallet address
- Add any public Ethereum wallet in seconds

### 🔄 Smart Sync
- Feed syncs every **15 seconds**
- Balances refresh every **60 seconds**
- Block number updates every **30 seconds**
- Auto-pauses when you switch tabs to save API calls
- Manual **↻ Refresh** button for instant updates

---

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript — no framework, no build step
- **Backend:** Vercel Serverless Function (Node.js) as API proxy
- **Data:** [Etherscan API v2](https://docs.etherscan.io/v2-migration)
- **Deployment:** Vercel (static + serverless)

---

## Setup

### 1. Get an Etherscan API Key

1. Create a free account at [etherscan.io](https://etherscan.io/register)
2. Go to **My Account → API Keys → Add**
3. Copy your key — the free plan gives you 100,000 calls/day

### 2. Deploy to Vercel

**Option A — via GitHub (recommended):**

1. Fork or clone this repo to your GitHub account
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Under **Environment Variables**, add:
   - **Key:** `ETHERSCAN_API_KEY`
   - **Value:** your Etherscan API key
4. Click **Deploy**

**Option B — manual upload:**

1. Download this repo as a ZIP
2. Go to [vercel.com](https://vercel.com) → **New Project** → **Upload**
3. Drag the folder in, add the environment variable, deploy

### 3. Run Locally (optional)

```bash
# Clone the repo
git clone https://github.com/SandroIeva/wallet-radar.git
cd wallet-radar

# Create your local environment file
echo "ETHERSCAN_API_KEY=your_key_here" > .env

# Install Vercel CLI and run locally
npm install -g vercel
vercel dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pushing Updates via Terminal

After making changes, push to GitHub with 3 commands:

```bash
git add .
git commit -m "describe your change"
git push origin main
```

Vercel automatically re-deploys on every push to `main`.

---

## Customizing Tracked Wallets

You can add wallets two ways:

**In the UI:** Click **+ Add Wallet**, type a `0x...` address or `.eth` ENS name, add a label, and save. Wallets are stored in your browser's localStorage.

**In the code:** Edit the `FAMOUS` array in `index.html` to change the default preloaded wallets:

```js
const FAMOUS = [
  { address: '0x...', label: 'My Wallet', tag: 'Personal' },
  // add more here
]
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ETHERSCAN_API_KEY` | ✅ Yes | Your Etherscan API key. Free at [etherscan.io/myapikey](https://etherscan.io/myapikey) |

---

## Project Structure

```
wallet-radar/
├── index.html          # Full app (UI + logic, single file)
├── api/
│   └── etherscan.js    # Vercel serverless proxy for Etherscan API
├── vercel.json         # Vercel routing config (no build step)
└── README.md
```

---

## How It Works

1. **On load:** The app fetches ETH balances for all tracked wallets in a single `balancemulti` API call
2. **Live feed:** Every 15s, it polls the latest transactions for each wallet via `txlist`
3. **Token holdings:** When you click a trader, it fetches their recent ERC-20 transfers via `tokentx`, then calculates net balances from the transfer history
4. **API proxy:** All Etherscan calls go through `/api/etherscan.js` — your API key is never exposed to the browser

---

## Limitations

- Token USD values are only estimated for well-known assets (USDC, USDT, WETH, WBTC, etc.) — exotic tokens show `—`
- Token holdings are based on the last 100 transfers — older holdings may not appear
- Etherscan free tier: 5 calls/second, 100,000 calls/day

---

## License

MIT — free to use, fork, and modify.

---

Built by [sandroieva.com](https://sandroieva.com)
