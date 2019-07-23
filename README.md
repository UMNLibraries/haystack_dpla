# DPLA Haystack

A tool to download and search DPLA bulk exports with regular expressions.

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
