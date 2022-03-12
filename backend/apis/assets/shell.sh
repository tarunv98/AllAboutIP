#! /usr/bin/sh

a=$(sh /home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/apis/assets/nmap.sh $1)
b=$(sh /home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/apis/assets/whois.sh $1)
c=$(sh /home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/apis/assets/trace.sh $1)
d=$(sh /home/tarunvasagiri/Documents/SIH_GIT/AllAboutIP/backend/apis/assets/ba.sh $1)

echo $a :: $b :: $c :: $d