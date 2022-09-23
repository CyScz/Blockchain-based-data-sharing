#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

function processInstall {
  log "Downloading Docker gpg cert and set up repo" $BIYellow
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo -e "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

  log "Installing Docker" $BIYellow
  sudo apt-get update
  sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose

  log "Starting service" $BIYellow
  sudo systemctl start docker

  log "Enabling service startup" $BIYellow
  sudo systemctl enable docker

  log "Adding '$SUDO_USER' to docker group" $BIYellow
  sudo usermod -a -G docker $SUDO_USER
  log "Current user '$SUDO_USER' has to log out and log on in order to reload group permissions" $BIRed
}

## script starts here

checkRoot true
processInstall
checkInstall "docker" "docker -v"
checkInstall "docker-compose" "docker-compose -v"
