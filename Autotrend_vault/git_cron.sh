#!/data/data/com.termux/files/usr/bin/bash
crontab -l > mycron
echo "*/30 * * * * bash ~/autotrend_vault/git_sync.sh" >> mycron
crontab mycron
rm mycron
