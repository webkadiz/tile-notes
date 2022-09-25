#!/bin/bash

cd /tmp
git clone git@github.com:webkadiz/tile-notes.git
cd tile-notes/client
npm i
PUBLIC_PATH=. npm run build
cp -r build /tmp/tile-notes-build
cd ..
git checkout gh-pages
rm -rf *
mv /tmp/tile-notes-build/* .
git add .
git commit -m deploy
git push
cd /tmp
rm -rf tile-notes
rm -rf tile-notes-build
