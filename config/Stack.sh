#!/usr/bin/env bash

# ---- APP DIR ----
app_dir="/usr/app"

# Install additional tools for docker and other
sudo yum install -y yum-utils device-mapper-persistent-data lvm2 wget
# Install docker
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0-rc1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install software
sudo yum install -y docker-ce git epel-release certbot
# sudo yum install -y nodejs gcc-c++ make yarn docker-ce git rethinkdb epel-release certbot

# Start docker
sudo systemctl start docker

# Create dir for app
mkdir $app_dir
cd $app_dir
# Clone repo
git clone git@gitlab.com:DevDigitalNomad/DashboardTS.git
# cd DashboardTS && yarn


# ---- GENERATING DHE key ----
# mkdir $app_dir/secret
# openssl dhparam -out /etc/letsencrypt/live/liquidash.pl/dhparam.pem 2048


# ---- GENERATING SSL ----
#certbot certonly --manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory