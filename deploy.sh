#!/bin/bash

cd /tmp
git clone git@github.com:webkadiz/tile-notes.git
test $? -ne 0 && exit 

cd tile-notes/client
npm i
PUBLIC_PATH=. npm run build
cp -r build /tmp/tile-notes-build

cd  /tmp/tile-notes
test $? -ne 0 && exit 

git checkout gh-pages
rm -rf /tmp/tile-notes/*
mv /tmp/tile-notes-build/* /tmp/tile-notes
git add .
git commit -m deploy
git push
cd /tmp
rm -rf tile-notes
rm -rf tile-notes-build
