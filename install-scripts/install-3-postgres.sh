#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

Color_Off='\e[0m'   # Text Reset
BIYellow='\e[1;93m' # Yellow
BIRed='\e[1;91m'    # Red
BIGreen='\e[1;92m'  # Green

DOCKER_PROJECT=postgres # stack name

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

## checkInstall [programName, testCommand]
function checkInstall {
  if ! command -v $2 &>/dev/null; then
    log "$1 installation error" $BIRed
    kill -s TERM $TOP_PID
  fi
  log "$1 installation completed \n$(eval $2)" $BIGreen
}

## script starts here

checkRoot
processInstall
checkInstall "postgres" "docker ps -f name=postgres_container"
checkInstall "pgadmin" "docker ps -f name=pgadmin4_container"
