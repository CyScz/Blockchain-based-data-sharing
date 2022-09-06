#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

FILE=go1.19.linux-amd64.tar.gz

function addPath {
  if ! grep -Fq "go/bin" /home/$SUDO_USER/.profile; then
    log "Registering PATH in user .profile" $BIYellow
    echo 'PATH="$PATH:/usr/local/go/bin"'>>/home/$SUDO_USER/.profile
      log "User '${SUDO_USER}' needs logoff/logon to apply group permissions or source ~/.profile" $BIRed
  fi
}

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
addPath
processInstall
checkInstall "Go" "/usr/local/go/bin/go version"
