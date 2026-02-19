#!/bin/bash
TARGET="9196280444"
# Check PM2 Status
UI_STATUS=$(pm2 jlist | jq -r '.[] | select(.name=="keystone-ui") | .pm2_env.status' || echo "STOPPED")
VAULT_STATUS=$(pm2 jlist | jq -r '.[] | select(.name=="vault-bot") | .pm2_env.status' || echo "STOPPED")

SUMMARY="Veritas V92 | UI=$UI_STATUS | VaultBot=$VAULT_STATUS | Build=SYNCED | [$(date +%H:%M)]"
termux-sms-send -n $TARGET "$SUMMARY"
