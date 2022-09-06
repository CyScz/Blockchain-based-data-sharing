#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

CONTAINER_NAME=portainer
HTTPS_PORT=9943

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

## script starts here

checkRoot false
checkGroupMembership docker
processInstall $CONTAINER_NAME
checkInstall "Portainer" "docker ps -f name=$CONTAINER_NAME"
