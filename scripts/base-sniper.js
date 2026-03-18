// base-sniper.js
// Base Accumulation Sniper - analyzes token flows on Base network
// Usage: node base-sniper.js

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
    console.log('🔍 Base Accumulation Sniper');
    console.log('============================\n');

    const timestamp = getTimestamp();
    let report = `Base Accumulation Sniper Report\n`;
    report += `Generated: ${new Date().toISOString()}\n`;
    report += `================================\n\n`;

    // Run Nansen commands
    console.log('Fetching token screener data...');
    const screenerResult = runCommand('nansen research token screener --chain base --timeframe 24h');
    report += `Token Screener (Base, 24h):\n${screenerResult}\n\n`;

    // Save report
    const filename = `base_scan_${timestamp}.txt`;
    const filepath = path.join(REPORTS_DIR, filename);
    fs.writeFileSync(filepath, report);

    console.log(`✅ Report saved to: scripts/reports/${filename}`);
    console.log(`📁 Full path: ${filepath}`);
}

main().catch(console.error);
