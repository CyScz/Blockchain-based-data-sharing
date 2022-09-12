#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

FILE=go1.19.linux-amd64.tar.gz

function processInstall {
  if [ ! -d $FILE ]; then
    log "Downloading binaries" $BIYellow
    wget -N "https://go.dev/dl/$FILE"
  fi

  log "Removing previous go installation and install" $BIYellow
  sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf $FILE
}

## script starts here

checkRoot true
processInstall
registerPath /usr/local/go/bin
checkInstall "Go" "/usr/local/go/bin/go version"
