#!/bin/bash

file_path="dist/migration_scripts/up.js"
remove_flag=""
directory="$(pwd)/src/migrations"
# Parse command line arguments
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --remove)
    remove_flag="$2"
    shift
    shift
    ;;
    *)
    # unknown option
    shift
    ;;
esac
done

if [ -f "$file_path" ]; then
    echo "Running migration to latest.. 🚀 🚀 🚀"
    full_path="$(pwd)/$file_path"
    if node "$full_path"; then
        echo "Migration Successful ✅ ✅ ✅"

        if [ -d "$directory" ]; then
            latest_file=$(ls -Art "$directory" | tail -n 1)
            echo "Latest file in the directory: $latest_file"
   
            if [ "$remove_flag" == "w" ]; then
                chmod -w "$directory/$latest_file"
                echo "Write permission removed from the latest file."
            fi
        else
            echo "Directory not found: $directory"
        fi

        exit 0
    else
        echo "Failed to migrate to latest ❌ ❌ ❌"  
        exit 1
    fi
else
    echo "Couldn't detect the JavaScript dist bundle 🖐 🖐"
    echo "run build before MigrateToLatest 🤌 🤌"
    exit 1
fi
