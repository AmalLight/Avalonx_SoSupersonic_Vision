#!/bin/bash

# sudo apt-get update
# sudo apt-get upgrade -y
# sudo apt-get install -y python3-flask

# pip3 install Flask
# pip3 install Flask[async]

sudo rm -f /usr/bin/py
sudo ln -s /bin/python3 /usr/bin/py

sudo rm -f /usr/bin/avalon
sudo ln -s /home/kaumi/Avalon/avalon.sh /usr/bin/avalon

chmod 755 -R /home/kaumi/Avalon

touch /home/kaumi/avalon.out
sudo chmod 755 /home/kaumi/avalon.out

sudo rm -f /var/www/html/avalon
sudo ln -s /home/kaumi/avalon.out /var/www/html/avalon
sudo chmod 755 /var/www/html/avalon
