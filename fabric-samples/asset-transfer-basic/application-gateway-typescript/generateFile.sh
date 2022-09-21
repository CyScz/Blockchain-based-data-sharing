#!/bin/bash
dd if=/dev/urandom of=${2-testFile.bin} bs=1024000 count=${1-10}
