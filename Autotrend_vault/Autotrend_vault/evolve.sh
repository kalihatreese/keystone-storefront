#!/data/data/com.termux/files/usr/bin/bash
echo "🧬 Keystone AI evolving storefront at $(date)" >> ~/evolve_log.txt
python3 ~/autotrend_vault/gen_blurbs.py
bash ~/autotrend_vault/clean_ingest.sh
bash ~/autotrend_vault/viral_adbot.sh
bash ~/autotrend_vault/git_sync.sh
