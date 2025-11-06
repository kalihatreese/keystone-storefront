#!/data/data/com.termux/files/usr/bin/bash
echo "🧬 Ingesting trends at $(date)" >> ~/vault_ingest_log.txt
python3 ~/autotrend_vault/tiktok_ingest.py
python3 ~/autotrend_vault/google_ingest.py
python3 ~/autotrend_vault/amazon_ingest.py
