#!/bin/bash

# Set the color variable
green='\033[0;32m'
# Clear the color after that
clear='\033[0m'

echo "$(pwd)/.env"

file_path="$(pwd)/src/types/db.d.ts"
folder="$(pwd)/src/types"


if [ ! -d "$folder" ]; then
    echo "Creating directory: $folder"
    mkdir -p "$folder"
fi

if npx kysely-codegen --dialect postgres --out-file "$file_path" --env-file="$(pwd)/.env"; then 
    printf "${green}Sucessfully type generated: $file_path ${clear}"
else
    echo "Failed to generate types"
fi
