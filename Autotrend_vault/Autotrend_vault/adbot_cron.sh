#!/data/data/com.termux/files/usr/bin/bash
crontab -l > mycron
echo "0 * * * * python3 ~/autotrend_vault/autotrend_vault_adbot.py" >> mycron
crontab mycron
rm mycron
