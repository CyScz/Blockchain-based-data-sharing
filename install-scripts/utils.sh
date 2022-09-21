#!/bin/bash

Color_Off='\e[0m'   # Text Reset
BIYellow='\e[1;93m' # Yellow
BIRed='\e[1;91m'    # Red
BIGreen='\e[1;92m'  # Green
BIWhite='\e[1;97m'  # Green

## log [Text, Color]
#  Prints the text in color
function log {
  echo -e "${2}${1}${Color_Off}"
}

## checkRoot [true|false]
#  Exits if it does not meet condition
function checkRoot {
  if [ ! "$EUID" -eq 0 ] && [ $1 = true ]; then
    log "Script must be run as root user eg.\n sudo ./${0##*/}" $BIRed
    kill -s TERM $TOP_PID
  elif [ "$EUID" -eq 0 ] && [ $1 = false ]; then
    log "Script must be run as normal user eg.\n ./${0##*/}" $BIRed
    kill -s TERM $TOP_PID
  fi
}

## checkGroupMembership [Group]
# Exit if user is not part of group
function checkGroupMembership {
  if ! (id | grep $1); then
    log "'$USER' does not have required permissions, please log out to apply" $BIRed
    kill -s TERM $TOP_PID
  fi
}

## checkInstall [programName, testCommand]
#  Checks whether the result of testCommand outputs something
function checkInstall {
  if ! command -v $2 &>/dev/null; then
    echo "$1 installation error" $BIRed
    kill -s TERM $TOP_PID
  fi
  log "$1 installation completed \n$(eval $2)" $BIGreen
}

## registerPath [Path]
#  registers a path in user profile
function registerPath {
  local logoutRequired=false
  for var in "$@"; do
    if ! grep -Fq $var /home/$SUDO_USER/.profile; then
      log "Registering PATH in user .profile" $BIYellow
      echo 'PATH="$PATH:'$var'"' >>/home/$SUDO_USER/.profile
      logoutRequired=true
    fi
  done

  if [ $logoutRequired = true ]; then
    log "Current user '$SUDO_USER' has to log off and log on in order to reload PATH or run\nsource ~/.profile" $BIRed
  fi
}
