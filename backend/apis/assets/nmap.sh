#! /usr/bin/sh

nmap -Pn $1 | grep open | wc -l