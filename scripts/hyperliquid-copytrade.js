// hyperliquid-copytrade.js
// Hyperliquid Copytrade Analysis - tracks top traders and positions
// Usage: node hyperliquid-copytrade.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPORTS_DIR = path.join(__dirname, 'reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function getTimestamp() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${yyyy}${mm}${dd}_${hh}${min}`;
}

function runCommand(cmd) {
    console.log(`Running: ${cmd}`);
    try {
        return execSync(cmd, { encoding: 'utf8', shell: true });
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function main() {
    console.log('📈 Hyperliquid Copytrade Report');
    console.log('=================================\n');

    const timestamp = getTimestamp();
    let report = `Hyperliquid Copytrade Report\n`;
    report += `Generated: ${new Date().toISOString()}\n`;
    report += `=================================\n\n`;

    // Run Nansen commands
    console.log('Fetching perp leaderboard (30 days)...');
    const leaderboardResult = runCommand('nansen research perp leaderboard --days 30');
    report += `Perp Leaderboard (30d):\n${leaderboardResult}\n\n`;

    // Note: Additional commands would go here for positions and trades
    // report += `Top Positions:\n${positionsResult}\n\n`;
    // report += `Recent Trades:\n${tradesResult}\n\n`;

    // Save report
    const filename = `hl_copytrade_${timestamp}.txt`;
    const filepath = path.join(REPORTS_DIR, filename);
    fs.writeFileSync(filepath, report);

    console.log(`✅ Report saved to: scripts/reports/${filename}`);
    console.log(`📁 Full path: ${filepath}`);
}

main().catch(console.error);
