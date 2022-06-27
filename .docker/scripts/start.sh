#!/bin/bash
# Share same permissions between container and host
if [ ! -z "$PUID" ]; then
  if [ -z "$PGID" ]; then
    PGID=${PUID}
  fi
  deluser node
  delgroup node
  addgroup --system --gid ${PGID} node
  adduser --system --ingroup node --disabled-password --home /var/cache/node --disabled-login --uid ${PUID} node
  chown -Rf node:node ${ROOT}
 else
  # Always chown webroot for better mounting
  chown -Rf node:node ${ROOT}
fi

# Start supervisord and services
exec tail -f /dev/null
