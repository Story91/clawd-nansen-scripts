# NansenCLI Scripts

Collection of scripts for generating crypto research reports using Nansen CLI.

## Scripts

### `base-sniper.js`
Base accumulation sniper - analyzes token flows on Base network.

```bash
nansen account
nansen research token screener --chain base --timeframe 24h
```

### `hyperliquid-copytrade.js`
Hyperliquid copytrade analysis - tracks top traders and their positions.

```bash
nansen research perp leaderboard --days 30
```

## Setup

1. Install Nansen CLI:
```bash
npm install -g @nansenai/nansen-cli
```

2. Configure API key:
```bash
nansen account
```

## Usage

Run reports and save to `scripts/reports/`:
```bash
cd scripts
node base-sniper.js
node hyperliquid-copytrade.js
```

Reports are saved to `reports/` folder with timestamps.

## Reports Output

Reports are generated in `reports/` directory:
- `base_scan_YYYYMMDD_HHMM.txt`
- `hl_copytrade_YYYYMMDD_HHMM.txt`

## Cron Jobs

These scripts are automated via OpenClaw:
- Base Accumulation Sniper: every 8 hours
- Hyperliquid Copytrade: every 8 hours (posts to Twitter)
