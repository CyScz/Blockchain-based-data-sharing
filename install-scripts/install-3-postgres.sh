#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

DOCKER_PROJECT=postgres # stack name

## removeContainer [CONTAINER_NAME]
#  stops and removes container
function removeContainer {
  if [ "$(docker ps -aq -f name=${1})" ]; then
    log "Removing previous installation" $BIYellow
    docker-compose -f postgres/docker-compose.yml down || true
  fi
}

function processInstall {
  removeContainer postgres_container
  log "Starting $DOCKER_PROJECT stack" $BIYellow
  docker-compose -f postgres/docker-compose.yml up -d
}

## script starts here

checkRoot false
processInstall
checkInstall "postgres" "docker ps -f name=postgres_container"
checkInstall "pgadmin" "docker ps -f name=pgadmin4_container"
