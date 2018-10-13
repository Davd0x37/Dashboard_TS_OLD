#!/usr/bin/env bash
# key="C:\Users\holgr\Projects\Dashboard\config\ssh\digitalocean"
app_dir="/usr/app/DashboardTS"
app="/usr/app"
function ex {
    ssh root@do $1
}

action=$1
second_action=$2
if [ "$action" = "create" ]; then
    scp "./ssh/config" root@do:~/.ssh/config
    scp "./ssh/gitlab" root@do:~/.ssh/gitlab
    scp "./ssh/gitlab.pub" root@do:~/.ssh/gitlab.pub
    scp "./Stack.sh" root@do:~/Stack.sh
    ex "sleep 10; sudo sh ~/Stack.sh"
elif [ "$action" = "git-pull" ]; then
    ex "cd $app_dir; git pull --force"
elif [ "$action" = "git-new" ]; then
    ex "rm -rf $app_dir;
    cd $app && git clone git@gitlab.com:DevDigitalNomad/DashboardTS.git;
    mkdir $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/fullchain.pem $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/privkey.pem $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/dhparam.pem $app_dir/config;"
elif [ "$action" = "deploy" ]; then
    ex "rm -rf $app_dir;
    cd $app && git clone git@gitlab.com:DevDigitalNomad/DashboardTS.git;
    mkdir $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/fullchain.pem $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/privkey.pem $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/dhparam.pem $app_dir/config;
    yarn;
    yarn lerna bootstrap;
    cd $app_dir; rm -rf $app_dir/packages/Api.Node/dist; yarn run api:build;
    cd $app_dir; rm -rf $app_dir/packages/Client.Vanilla/dist; yarn run client_vanilla:build:build;
    cd $app_dir; yarn run api:deploy;"
    # nginx -s stop; nginx -c $app_dir/nginx.conf;
fi