#!/data/data/com.termux/files/usr/bin/bash
# 🧬 Clean vault before ingesting fresh trends
echo "🧬 Resetting vault_ingest.txt at $(date)" > ~/vault_ingest.txt
bash ~/autotrend_vault/ingest_all.sh
