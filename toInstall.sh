#!/bin/bash

# ------------------------------------------

# UPDATE PIP

pip3 cache purge

pip3 install --upgrade pip

# SECURITY check

pip3 --disable-pip-version-check list

# REMOVE if you filter

pip3 --disable-pip-version-check list --format=json | python3 -c "import json, sys; print('\n'.join([x['name'] for x in json.load(sys.stdin)]))" \
\
| grep | xargs -n1 pip3 uninstall -y

# UPGRADE outdated

pip3 --disable-pip-version-check list --outdated --format=json | python3 -c "import json, sys; print('\n'.join([x['name'] for x in json.load(sys.stdin)]))" \
\
| xargs -n1 pip3 install -U

# ------------------------------------------

sudo apt install -y nodejs npm

curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && \
sudo apt-get install -y nodejs

sudo npm install -g npm@latest

sudo npm install -g sass nodemon typescript

mkdir              /home/kaumi/Git/Avalonx_SoSupersonic_Vision/SoSupersonic/server/dist/public/CSV/
sudo    ln     -sf /home/kaumi/Git/Avalonx_SoSupersonic_Vision/SoSupersonic/server/dist/public/CSV/ /var/www/html/csv
sudo chmod 755 -R                                                                                   /var/www/html

# ------------------------------------------

# for each single projects:
npm init
npm install @types/node @types/node-sass @types/express @types/md5
npm install express node-sass md5

# vscode -> HTML5 Extension Pack
# vscode -> Javascript Extension Pack
# vscode -> Node Extension Pack
# vscode -> Node.js Extension Pack
# vscode -> Sass Extension Pack
# vscode -> TypeScript Extension Pack
#
# "scripts" :
# {
#    "sass" : "node-sass -w src/public/style/ -o dist/public/style/",
# },
#
# "private": true,

nodemon dist/private/scripts/index.js
tsc -w --allowSyntheticDefaultImports
