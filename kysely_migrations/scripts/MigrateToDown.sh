#!/bin/bash

file_path="dist/migration_scripts/down.js"

if [ -f "$file_path" ]; then
    echo "Running down migration 🙈 🙈 🙈"
    full_path="$(pwd)/$file_path"
    if node "$full_path"; then
       echo "Migration Sucessful ✅ ✅ ✅"
       exit 0
    else
       echo "Failed to down migrate ❌ ❌ ❌" 
       exit 0 
    fi
else
    echo "MigrateToDown script not available 🖐 🖐"
    echo "run build before MigrateToDown 🤌 🤌"
    exit 0
fi