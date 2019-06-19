#!/bin/bash

# Get a fresh copy of DPLA data
node run_downloader.js;

for filename in ./dpla_data/*.gz; do
    [ -e "$filename" ] || continue
    echo "nohup node run -i $filename &";
    eval "nohup node run -i $filename &"
done