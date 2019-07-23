#!/bin/bash

# Get a fresh copy of DPLA data
node run_downloader.js;

MATCHES_DIR_ARG=$1
DEFAULT_MATCHES_DIR="$PWD/matches"
MATCHES_DIR="${MATCHES_DIR_ARG:-$DEFAULT_MATCHES_DIR}"

DEFAULT_REGEXES_FILEPATH="$PWD/umbra_regexes.json"
REGEXES_FILEPATH_ARG=$2
REGEXES_FILEPATH="${REGEXES_FILEPATH_ARG:-$DEFAULT_REGEXES_FILEPATH}"

for filename in ./dpla_data/*.gz; do
    [ -e "$filename" ] || continue
    echo "nohup node run -i $filename -m $MATCHES_DIR -r $REGEXES_FILEPATH &";
    eval "nohup node run -i $filename -m $MATCHES_DIR -r $REGEXES_FILEPATH &"
done