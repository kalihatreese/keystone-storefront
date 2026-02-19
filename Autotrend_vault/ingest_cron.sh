#!/data/data/com.termux/files/usr/bin/bash
crontab -l > mycron
echo "0 6 * * * bash ~/autotrend_vault/ingest_all.sh" >> mycron
crontab mycron
rm mycron
