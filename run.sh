#!/bin/bash

# Get a fresh copy of DPLA data
node run_downloader.js;

MATCHES_DIR=$0


for filename in ./dpla_data/*.gz; do
    [ -e "$filename" ] || continue
    echo "nohup node run -i $filename -m $MATCHES_DIR &";
    eval "nohup node run -i $filename -m $MATCHES_DIR &"
done