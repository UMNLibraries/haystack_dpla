# DPLA Haystack

A tool to download and search DPLA bulk exports with regular expressions.

## Prerequisites

[Node.js](https://nodejs.org)

For local Node development, try [NVM](https://github.com/nvm-sh/nvm#installation-and-update) to manage Node versions.

## Install

 ```bash
git clone https://github.com/UMNLibraries/haystack_dpla.git;
cd haystack_dpla;
npm install;
```

## Run

**NOTE**: These scripts will download a large-ish amount of DPLA record data (over 15G).

```bash
# I just want to see it do something:
./run.sh

# Search with your own regex file:
./run.sh -r /path/to/my/regex/file.json # (See umbra_regexes.json in app root for an example)

# Specify where you want json matches files to be saved:
./run.sh -m /your/match/path/dir # (defaults to app root/matches)

```

Note: DPLA offers bulk download on S3 but it requires any AWS authentication. The bucket is not fully public, but all credentialed AWS users may read it. No specially granted API key is necessary
