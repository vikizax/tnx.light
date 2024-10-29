#!/bin/bash

timestamp=$(date +%s)
folder="src/migrations"
filename="$folder/$(date +%s)-$(uuidgen | cut -d'-' -f1).ts"

contents='
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
}

export async function down(db: Kysely<any>): Promise<void> {
}
'

if [ ! -d "$folder" ]; then
    echo "Creating directory: $folder"
    mkdir -p "$folder"
fi

echo "$contents" > "$filename"
echo "New migration file created: $filename ✅✅✅"
echo "Now cd into the folder: $folder and open the $filename.ts file"
