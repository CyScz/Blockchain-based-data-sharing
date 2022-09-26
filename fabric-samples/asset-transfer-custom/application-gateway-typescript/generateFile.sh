#!/bin/bash
# this script generates (a) binary file(s) with random data
# command-line arguments [quantity, size, filepath]
# Default : 1 file of 10 MB in this folder

quantity=${1- 1};
size=${2-10};
filepath=${3-"./"};

echo "Creating ${quantity} file(s) of ${size}MB in ${filepath}";

for ((i=0; i < quantity; i++)); do
  filename=${filepath}/testFile${i}.bin;
  dd if=/dev/urandom of="${filename}" bs=1024000 count="${size}";
done
