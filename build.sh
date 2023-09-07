#!/bin/bash

# current_dir=/home/jjones/projects/robinhood
current_dir=/home/tech/projects/content_dashboard
echo "Current directory: $current_dir"
# cd $current_dir
# git pull
git -C $current_dir pull

source /home/tech/.nvm/nvm.sh
nvm use 16
npm i --prefix $current_dir/client
npm i --prefix $current_dir/server
sudo docker compose -f $current_dir/prod-docker-compose.yml up content_dashboard_server content_dashboard_svelte  --build --force-recreate -d