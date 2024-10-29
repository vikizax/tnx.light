#!/bin/bash

folder_path="dist"

if [ -d "$folder_path" ]; then
    rm -r "$folder_path"
    echo "Existing build deleted."
fi


if tsc; then
  echo "Build successful! ✅✅✅"
  exit 0
else
  echo "Build failed! ❌❌❌"
  exit 1
fi