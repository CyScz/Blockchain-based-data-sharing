#!/bin/bash
trap "exit 1" TERM
export TOP_PID=$$

# import utils script file
. ./utils.sh

SOURCES_FOLDER=/home/$USER
FABRIC_FOLDER=/opt/fabric
# CUSTOM_CC_PATH relative path from network.sh file location! ($FABRIC_FOLDER/fabric-samples/test-network)
CUSTOM_CC_PATH="../asset-transfer-custom/chaincode-typescript"
REPO_FOLDER=Blockchain-based-data-sharing

## getBinaries
#  installs binaries and clones custom fabric samples with data-sharing chaincode and apps
function getBinaries {
  checkRoot true

  if [ -d $FABRIC_FOLDER ]; then
    log "Folder $FABRIC_FOLDER already exists. Exiting." $BIRed
    kill -s TERM $TOP_PID
  fi

  log "Creating target folder" $BIYellow
  sudo mkdir -p $FABRIC_FOLDER
  sudo chmod 777 $FABRIC_FOLDER

  log "Launching hyperledger bootstrap"
  # run as user
  su $SUDO_USER <<EOF
source /home/$SUDO_USER/.profile
cd $FABRIC_FOLDER || exit
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/bootstrap.sh | bash -s
EOF

  log "Done" $BIGreen

  registerPath $FABRIC_FOLDER/fabric-samples/bin
}

## startNetwork
#  creates the test network with CAs
function startNetwork {
  checkRoot false
  log "Creating test network with channel 'mychannel' and CAs" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/test-network" || exit
  ./network.sh up createChannel -c mychannel -ca
}

## stopNetwork
#  stops the test network and removes Docker containers
function stopNetwork {
  checkRoot false
  log "Removing Prometheus/Graphana" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/test-network/prometheus-grafana" || exit
  docker-compose down

  log "Stopping test network" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/test-network" || exit
  ./network.sh down
}

## deployDemo
#  deploys the demo asset-transfer-basic chaincode
function deployDemoChaincode {
  checkRoot false
  checkFolder "$FABRIC_FOLDER/fabric-samples/" "Folder fabric-samples not exists\nPlease run ./${0##*/} --start"
  checkRunning

  log "Deploying demo chaincode" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/test-network" || exit
  ./network.sh deployCC -c mychannel -ccn basic -ccp ../asset-transfer-basic/chaincode-typescript -ccl typescript

  log "Installing demo Node.js app" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/asset-transfer-basic/application-gateway-typescript" || exit
  chmod +x generateFile.sh
  npm install

  log "Done" $BIGreen
}

## deployCustom
#  deploys the data-sharing chaincode
function deployCustomChaincode {
  checkRoot false
  checkRunning

  if [ ! -f $FABRIC_FOLDER/customCcInstalled ]; then
    touch $FABRIC_FOLDER/customCcInstalled
    log "Copying customised material to original fabric samples" $BIYellow
    cp -R -S .bak $SOURCES_FOLDER/$REPO_FOLDER/fabric-samples/. $FABRIC_FOLDER/fabric-samples/
  fi

  log "Deploying custom chaincode" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/test-network" || exit
  ./network.sh deployCC -c mychannel -ccn basic -ccp $CUSTOM_CC_PATH -ccl typescript

  log "Installing custom Node.js app" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/asset-transfer-custom/application-gateway-typescript" || exit
  npm install

  log "Done" $BIGreen
}

## deployGraphana
function deployGrafanaPrometheus {
  checkRoot false
  log "Installing Prometheus/Graphana" $BIYellow
  cd "$FABRIC_FOLDER/fabric-samples/test-network/prometheus-grafana" || exit
  docker-compose up -d
  checkInstall "Graphana" "docker ps -f name=grafana"
  checkInstall "Prometheus" "docker ps -f name=prometheus"
}

## checkRunning
#  checks whether Hyperledger network is installed
function checkRunning {
  if [ ! "$(docker ps -aq -f name=orderer.example.com)" ]; then
    log "Hyperledger network not installed. Please run\n ./${0##*/} --start and retry"
    kill -s TERM $TOP_PID
  fi
}

## checkFolder [FolderPath, message]
#  exits if folder does not exist
function checkFolder {
  if [ ! -d $1 ]; then
    log "$2" $BIRed
    kill -s TERM $TOP_PID
  fi
}

function showHelp {
  log "\nHyperledger installation script\n" $BIWhite
  log "Usage: ${0##*/} [OPTION]\n"

  log "${BIWhite}Note$Color_Off This script does not handle combined options e.g. -is or --install --start\n"

  log "\t-h" $BIWhite
  log "\t\tdisplay this help and exit"

  log "\t-i" $BIWhite
  log "\t--install" $BIWhite
  log "\t\tlaunch Hyperledger bootstrap"
  log "\t\tRequires root permissions" $BIWhite

  log "\t--start" $BIWhite
  log "\t\tstart the test network with CAs"

  log "\t--stop" $BIWhite
  log "\t\tstop test network"

  log "\t-m" $BIWhite
  log "\t--metrics" $BIWhite
  log "\t\tinstall Prometheus and Grafana"

  log "\t-d" $BIWhite
  log "\t--demo" $BIWhite
  log "\t\tinstall demo chaincode and app"

  log "\t-c" $BIWhite
  log "\t--custom" $BIWhite
  log "\t\tclone project repository"
  log "\t\tinstall custom chaincode and apps"
}

## script starts here

while :; do
  case $1 in
  -h | -\? | --help)
    showHelp # Display a usage synopsis.
    kill -s TERM $TOP_PID
    ;;
  -i | --install)
    getBinaries
    kill -s TERM $TOP_PID
    ;;
  -s | --start)
    startNetwork
    kill -s TERM $TOP_PID
    ;;
  -x | --stop)
    stopNetwork
    kill -s TERM $TOP_PID
    ;;
  -m | --metrics)
    deployGrafanaPrometheus
    kill -s TERM $TOP_PID
    ;;
  -d | --demo)
    deployDemoChaincode
    kill -s TERM $TOP_PID
    ;;
  -c | --custom)
    deployCustomChaincode
    ;;
  --) # End of all options.
    shift
    break
    ;;
  -?*)
    printf 'WARN: Unknown option (ignored): %s\n' "$1" >&2
    ;;
  *) # Default case: No more options, so break out of the loop.
    break ;;
  esac

  shift
done
