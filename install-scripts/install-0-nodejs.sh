#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

Color_Off='\e[0m'   # Text Reset
BIYellow='\e[1;93m' # Yellow
BIRed='\e[1;91m'    # Red
BIGreen='\e[1;92m'  # Green

## log [TEXT, COLOR]
#  Prints the text in given color
log() {
  echo -e "${2}${1}${Color_Off}"
}

## Exit if not root
function checkRoot {
  if [ ! "$EUID" -eq 0 ]; then
    log "Script must be run as root e.g.\n sudo ./${0##*/}" $BIRed
    kill -s TERM $TOP_PID
  fi
}

function processInstall {
  log "Downloading NodeSource script for gpg cert and set up repo" $BIYellow
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

  log "Installing Node.js + tree and jq utilities" $BIYellow
  sudo apt-get install -y nodejs tree jq
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
checkInstall "Node.js" "node -v"
