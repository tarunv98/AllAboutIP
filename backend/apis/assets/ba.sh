#! /usr/bin/sh

now=$(date +"%I:%M:")

cat /home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/logs/server.log.ndjson | grep now | grep $1 | wc -l