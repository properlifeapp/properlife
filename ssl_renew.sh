#!/bin/bash
COMPOSE="/usr/bin/docker compose --ansi never"
DOCKER="/usr/bin/docker"

cd /home/tech/appsMrcOrg/
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP webserver
#$DOCKER system prune -af
