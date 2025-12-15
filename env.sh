#!/bin/sh
# env.sh - injects environment variables into index.html at container start

echo "Injecting runtime environment variables..."
# Path to index.html
INDEX_FILE="/usr/share/nginx/html/index.html"
# Backup original index.html if not already backed up
[ ! -f "${INDEX_FILE}.orig" ] && cp $INDEX_FILE "${INDEX_FILE}.orig"
# Start with original index.html
cp "${INDEX_FILE}.orig" $INDEX_FILE
# Replace all ${VITE_*} placeholders with the current environment values
for var in VITE_BASENAME VITE_KC_URL VITE_KC_REALM VITE_KC_CLIENT_ID; do
  value=$(printenv $var)
  # Escape slashes for sed
  safe_value=$(echo $value | sed 's/[&/\]/\\&/g')
  sed -i "s|\${$var}|$safe_value|g" $INDEX_FILE
done
echo "Runtime environment variables injected."
