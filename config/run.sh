#!/usr/bin/env bash
key="C:\Users\holgr\Projects\Dashboard\config\ssh\digitalocean"
app_dir="/usr/app/DashboardTS"
app="/usr/app"
function ex {
    ssh -i ${key} root@do $1
}

action=$1
second_action=$2
if [ "$action" = "create" ]; then
    scp -i ${key} "./ssh/config" root@do:~/.ssh/config
    scp -i ${key} "./ssh/gitlab" root@do:~/.ssh/gitlab
    scp -i ${key} "./ssh/gitlab.pub" root@do:~/.ssh/gitlab.pub
    scp -i ${key} "./Stack.sh" root@do:~/Stack.sh
    ex "sleep 10; sudo sh ~/Stack.sh"
elif [ "$action" = "git" ]; then
    ex "cd $app_dir; git pull --force"
elif [ "$action" = "git-new" ]; then
    ex "rm -rf $app_dir;
    cd $app && git clone git@gitlab.com:DevDigitalNomad/DashboardTS.git;
    mkdir $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/fullchain.pem $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/privkey.pem $app_dir/config;
    cp /etc/letsencrypt/live/liquidash.pl/dhparam.pem $app_dir/config;
    cd $app_dir/packages/Api.Node && yarn;
    cd $app_dir/packages/Client.Vanilla && yarn;"
elif [ "$action" = "api" ]; then
    ex "cd $app_dir; rm -rf $app_dir/api/dist; yarn run api:build"
elif [ "$action" = "client" ]; then
    ex "cd $app_dir; rm -rf $app_dir/client/dist; yarn run client:build"
elif [ "$action" = "serve" ]; then
    ex "cd $app_dir; yarn run serve"
elif [ "$action" = "deploy" ]; then
    ex "cd $app_dir; docker system prune --all --force --volumes; yarn run deploy"
elif [ "$action" = "nginx" ]; then
    ex "nginx -s stop; nginx -c $app_dir/nginx.conf"
fi
