# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "centos/7"

  config.vm.network "forwarded_port", guest: 8000, host: 8000
  
  config.ssh.insert_key = false

  config.vm.provision "shell", inline: <<-SHELL
    sudo yum -y install wget
    
    curl --silent --location https://rpm.nodesource.com/setup_9.x | sudo bash -
    sudo yum -y install nodejs

    sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
    sudo yum -y install yarn

    sudo wget http://download.rethinkdb.com/centos/7/`uname -m`/rethinkdb.repo \
          -O /etc/yum.repos.d/rethinkdb.repo
    sudo yum -y install rethinkdb
  SHELL
end
