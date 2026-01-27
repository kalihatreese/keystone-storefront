#!/bin/bash
# 1. Ingest History (Oracle)
./veritas_oracle.sh

# 2. Repair & Build (Steward)
./veritas_repair.sh # Contains your sed patches
npx next build

# 3. Generate Visuals (Webpage)
./generate_veritas_ui.sh

# 4. Text Status
termux-sms-send -n 9196280444 "Veritas: Sync Complete. Webpage LIVE. ShadowX/Trinity aligned."
