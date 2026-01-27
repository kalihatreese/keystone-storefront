#!/bin/bash
CONV_JSON="/data/data/com.termux/files/home/truth/conversations.json"
INV_JSON="/data/data/com.termux/files/home/truth/inventory.json"
STATE_FILE="/data/data/com.termux/files/home/keystone-storefront/system_state.env"

echo "# 50y50y V92 - Full Stack Manifest" > $STATE_FILE

# 1. Financials
PROFIT_VAL=$(grep -i "profit" "$CONV_JSON" | tail -n 1 | grep -o "[0-9]\{1,9\}\.[0-9]\{2\}")
echo "STORE_PROFIT='${PROFIT_VAL:-0.00}'" >> $STATE_FILE

# 2. Inventory Ingestion (Direct extraction of first 3 items)
INV_DATA=$(cat $INV_JSON | tr -d '\n\r ' | sed "s/['\"]//g")
echo "INV_SNAPSHOT='${INV_DATA:0:250}'" >> $STATE_FILE

# 3. Logic Extraction
for ENTITY in "Autotrend_vault" "storefront"; do
    MATCH=$(grep -i -A 10 "$ENTITY" "$CONV_JSON" | grep -m 1 "parts" | sed "s/[{}\"\[\]']//g" | sed "s/parts://g")
    [ ! -z "$MATCH" ] && echo "LOGIC_${ENTITY^^}='${MATCH:0:150}'" >> $STATE_FILE
done
echo "Oracle: Inventory and Logic synchronized."
