#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

function processInstall {
  log "Downloading NodeSource script for gpg cert and set up repo" $BIYellow
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

  log "Installing Node.js + tree and jq utilities" $BIYellow
  sudo apt-get install -y nodejs tree jq
}

## script starts here

checkRoot true
processInstall
checkInstall "Node.js" "node -v"
