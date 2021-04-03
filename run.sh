#!/bin/bash

# Get a fresh copy of DPLA data
node run_downloader.js;

while getopts 'm:r:' arg
do
    case ${arg} in
        m) MATCHES_DIR_ARG=${OPTARG};;
        r) REGEXES_FILEPATH_ARG=${OPTARG};;
        *) return 1 # illegal option
    esac
done

DEFAULT_MATCHES_DIR="$PWD/matches"
MATCHES_DIR="${MATCHES_DIR_ARG:-$DEFAULT_MATCHES_DIR}"

DEFAULT_REGEXES_FILEPATH="$PWD/umbra_regexes.json"
REGEXES_FILEPATH="${REGEXES_FILEPATH_ARG:-$DEFAULT_REGEXES_FILEPATH}"

for filename in ./dpla_data/*.gz; do
    [ -e "$filename" ] || continue
    echo "nohup node run -i $filename -m $MATCHES_DIR -r $REGEXES_FILEPATH &";
    eval "nohup node run -i $filename -m $MATCHES_DIR -r $REGEXES_FILEPATH &"
done