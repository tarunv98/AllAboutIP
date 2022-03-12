#! /usr/bin/sh

echo $now

a=$(sh ./nmap.sh $1)
b=$(sh ./whois.sh $1)
c=$(sh ./trace.sh $1)
d=$(sh ./ba.sh $1)

echo $a :: $b :: $c :: $d