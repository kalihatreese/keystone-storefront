#!/bin/bash
if [ ! -f LICENSE_VALID ]; then
  echo "🚫 Launch blocked — license not validated"
  exit 1
fi
node keystone-runner.js && echo "🛒 Store launched — logged in .IMMORTAL_PAYLOAD"
