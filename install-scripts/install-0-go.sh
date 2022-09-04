#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

Color_Off='\e[0m'   # Text Reset
BIYellow='\e[1;93m' # Yellow
BIRed='\e[1;91m'    # Red
BIGreen='\e[1;92m'  # Green

FILE=go1.19.linux-amd64.tar.gz

## log [TEXT, COLOR]
#  Prints the text in color
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

function addPath {
  if ! grep -Fq "go/bin" /etc/environment; then
    log "Registering PATH in /etc/environment" $BIYellow
    echo 'PATH="$PATH:/usr/local/go/bin"' >>/etc/environment
  fi
}

## checkInstall [programName, testCommand]
function checkInstall {
  if ! command -v $2 &>/dev/null; then
    echo "$1 installation error" $BIRed
    kill -s TERM $TOP_PID
  fi
  log "$1 installation completed \n$(eval $2)" $BIGreen
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

checkRoot
addPath
processInstall
checkInstall "Go" "/usr/local/go/bin/go version"
