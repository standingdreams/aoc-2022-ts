#! /bin/bash

DAY=${1}

if [ -z ${DAY} ]; then
    echo "Please provide a day number"
    exit 1
fi

npx ts-node "src/day-$1/index.ts"