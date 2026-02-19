# cole-watchdog.sh\nif git remote -v | grep -q "unauthorized"; then\n  echo "🚨 Unauthorized clone detected. Cole is locking down."\nfi
