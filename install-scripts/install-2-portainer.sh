#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

Color_Off='\e[0m'   # Text Reset
BIYellow='\e[1;93m' # Yellow
BIRed='\e[1;91m'    # Red
BIGreen='\e[1;92m'  # Green

CONTAINER_NAME=portainer
HTTPS_PORT=9943

## log [TEXT, COLOR]
#  Prints the text in given color
function log {
  echo -e "${2}${1}${Color_Off}"
}

## Exit if root
function checkRoot {
  if [ "$EUID" -eq 0 ]; then
    log "Script must be run as normal docker user e.g.\n ./${0##*/}" $BIRed
    kill -s TERM $TOP_PID
  fi
}

# Exit if user is not part of docker group
function checkPermissions {
  if ! id | grep docker; then
    log "'$USER' does not have Docker permissions, please log out to apply" $BIRed
    kill -s TERM $TOP_PID
  fi
}

## removeContainer [CONTAINER_NAME]
#  stops and removes container
function removeContainer {
  if [ "$(docker ps -aq -f name=${1})" ]; then
    log "Removing previous installation" $BIYellow

    if [ "$(docker ps -aq -f status=running -f name=${1})" ]; then
      log "Stopping '${1}'" $BIYellow
      docker stop $1
    fi
    log "Removing '${1}'" $BIYellow
    docker rm $1
  fi
}

## deploy [CONTAINER_NAME]
#  Create and run docker container
function processInstall {
  removeContainer $1
  log "Creating $1 _data volume" $BIYellow
  docker volume create portainer_data

  log "Starting portainer-ce:latest" $BIYellow
  docker run -d -p $HTTPS_PORT:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
}

## checkInstall [programName, testCommand]
function checkInstall {
  if ! command -v $2 &>/dev/null; then
    echo "$1 installation error" $BIRed
    exit
  fi
  log "$1 installation completed \n$(eval $2)" $BIGreen
}

## script starts here

checkRoot
checkPermissions
processInstall $CONTAINER_NAME
checkInstall "Portainer" "docker ps -f name=$CONTAINER_NAME"
