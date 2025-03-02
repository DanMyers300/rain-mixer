#!/bin/sh

cd ./dist/electron/ || exit

for file in *.js; do
    mv -- "$file" "${file%.js}.cjs"
done
