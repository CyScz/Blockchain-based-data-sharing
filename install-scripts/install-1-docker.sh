#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

Color_Off='\e[0m'   # Text Reset
BIYellow='\e[1;93m' # Yellow
BIRed='\e[1;91m'    # Red
BIGreen='\e[1;92m'  # Green

## log [TEXT, COLOR]
#  Prints the text in given color
function log {
  echo -e "${2}${1}${Color_Off}"
}

## Exit if not root
function checkRoot {
  if [ ! "$EUID" -eq 0 ]; then
    log "Script must be run as root e.g.\n sudo ./${0##*/}" $BIRed
    kill -s TERM $TOP_PID
  fi
}

function checkInstall {
  local test
  if ! command -v /usr/local/go/bin/go &>/dev/null; then
    echo "Node installation error" $BIRed
    kill -s TERM $TOP_PID
  fi
  test=$(node --version)
  log "Node installation completed, installed version \n $test" $BIGreen
}

function processInstall {
  log "${BIYellow}Downloading Docker gpg cert and set up repo${Color_Off}" $BIYellow
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

  log "Adding ${SUDO_USER} to docker group" $BIYellow
  sudo usermod -a -G docker $SUDO_USER
  log "User '${SUDO_USER}' needs logoff/logon to apply group permissions" $BIRed
}

## checkInstall [programName, testCommand]
function checkInstall {
  if ! command -v $2 &>/dev/null; then
    echo "$1 installation error" $BIRed
    kill -s TERM $TOP_PID
  fi
  log "$1 installation completed \n$(eval $2)" $BIGreen
}

## script starts here

checkRoot
processInstall
checkInstall "docker" "docker -v"
checkInstall "docker-compose" "docker-compose -v"
