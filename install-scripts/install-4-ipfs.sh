#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

CONTAINER_NAME=ipfs
DOCKER_VOLUMES_PATH=/docker

## removeContainer [ContainerName]
#  stops and removes container
function removeContainer {
  if [ "$(docker ps -aq -f name=$1)" ]; then
    log "Removing previous installation" $BIYellow

    if [ "$(docker ps -aq -f status=running -f name=$1)" ]; then
      log "Stopping '$1'" $BIYellow
      docker stop $1
    fi
    log "Removing '$1'" $BIYellow
    docker rm $1
  fi
}

## removeFolder [FolderPath]
function removeFolder {
  local path="$DOCKER_VOLUMES_PATH/$1"
  if [ -d $path ]; then
    log "Removing data folders" $BIYellow
    sudo rm -r $path
  fi
}

## generateSwarm
#  generates a swarm.key file
function generateSwarm {
  if [ ! -d swarm.key ]; then
    log "Generate new swarm.key file" $BIYellow
    echo -e "/key/swarm/psk/1.0.0/\n/base16/\n$(tr -dc 'a-f0-9' </dev/urandom | head -c64)" >swarm.key
    log "$(cat swarm.key)" $BIGreen
  fi
}

## generateInit
#  generates a 001-init.sh file
function generateInit {
  if [ ! -d 001-init.sh ]; then
    log "Generate 001-init.sh file" $BIYellow
    echo -e "#!/bin/sh\nset -ex\nipfs bootstrap rm all" >001-init.sh
    log "$(cat 001-init.sh)" $BIGreen
  fi
}

## createFolder [ContainerName]
#  creates volume folder with required files
function createFolder {
  local path="$DOCKER_VOLUMES_PATH/$1"
  log "Create volume folders $path" $BIYellow
  sudo mkdir -p $path/data $path/staging
  sudo chown root:app $path/data $path/staging
  chmod g+s $path/data $path/staging

  log "Copy swarm.key in volume folder" $BIYellow
  sudo cp swarm.key $path/data

  log "Copy 001-init.sh file" $BIYellow
  sudo cp 001-init.sh $path
}

## deploy [ContainerName]
#  creates and run Docker container
function deploy {
  local path=$DOCKER_VOLUMES_PATH/$1
  log "Starting ipfs/kubo:latest $1" $BIYellow
  docker run -d --name $1 -v $path/001-init-0.sh:/container-init.d/001-init-0.sh -v $path/staging:/export -v $path/data:/data/ipfs -e IPFS_SWARM_KEY_FILE=/data/ipfs/swarm.key -e LIBP2P_FORCE_PNET=1 -p 4001:4001 -p 4001:4001/udp -p 0.0.0.0:8081:8080 -p 0.0.0.0:5001:5001 --restart=always ipfs/kubo:latest
}

## script starts here

checkRoot true
removeContainer $CONTAINER_NAME
removeFolder $CONTAINER_NAME
generateSwarm
generateInit
createFolder $CONTAINER_NAME
deploy $CONTAINER_NAME

checkInstall "ipfs/kubo" "docker ps -f name=$CONTAINER_NAME"
