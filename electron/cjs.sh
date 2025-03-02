#!/bin/sh

dir="./dist/electron"

# Check if the directory exists
if [ ! -d "$dir" ]; then
    echo "Directory $dir does not exist"
    exit 0
fi

# Try to change directory, suppress any error messages
if ! cd "$dir" 2>/dev/null; then
    echo "Cannot access directory $dir"
    exit 0
fi

# Check if there are any .js files
set -- *.js
if [ $# -eq 0 ] || [ ! -e "$1" ]; then
    echo "No .js files found in $dir"
    exit 0
fi

# Rename all .js files to .cjs
for file in *.js; do
    mv -- "$file" "${file%.js}.cjs"
done

# Exit successfully
exit 0
