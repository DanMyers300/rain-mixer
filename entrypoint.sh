#!/bin/sh
# Start user-level DBUS session
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus
mkdir -p /run/user/$(id -u)
dbus-daemon --session --fork --address=$DBUS_SESSION_BUS_ADDRESS

# Run the application
exec "$@"
