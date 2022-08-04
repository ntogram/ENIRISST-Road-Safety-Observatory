#!/bin/bash

sudo apt install npm
npm cache clean -f
sudo npm install -g n
sudo n stable
export NODE_OPTIONS=--max-old-space-size=8192 
npm install --force
npm install axios
