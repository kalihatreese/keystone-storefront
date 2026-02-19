#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")"
git diff --quiet || echo "[watchdog] uncommitted changes present"
