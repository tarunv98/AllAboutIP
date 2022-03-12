#! /usr/bin/sh

now=$(date +"%I:%M:")

cat ../../logs/server.log.ndjson | grep now | grep $1 | wc -l