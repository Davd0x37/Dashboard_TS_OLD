# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"

  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 3030, host: 3030
  config.vm.network "forwarded_port", guest: 4000, host: 4000

  config.vm.hostname = "dashboard"
  
  config.vm.provision :docker
  config.vm.provision :docker_compose, yml: "/vagrant/docker-prod.yml", run: "always"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
    vb.cpus = "2"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   sudo yum update
  #   sudo yum install -y yum-utils device-mapper-persistent-data lvm2 wget
  #   sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  #   # Install docker-compose
  #   sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  #   sudo chmod +x /usr/local/bin/docker-compose
  #   sudo yum install -y docker-ce git epel-release certbot
  #   sudo systemctl start docker
  # SHELL
end
