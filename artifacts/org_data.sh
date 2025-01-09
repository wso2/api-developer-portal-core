#!/bin/bash

# Directory containing the files
DIRECTORY="./artifacts/default/orgcontent/ACME"
ORG_ID="some_organization_id"

# for file in "$DIRECTORY"/*; do
#   if [ -f "$file" ]; then
#     echo "$file"
#   fi
# done

# Loop through files in the directory
process_directory() {
    local DIR="$1"
    for file in "$DIR"/*; do
        if [ -d "$file" ]; then
            echo "Entering directory: $file"
            process_directory "$file"
        elif [ -f "$file" ]; then
            echo "Processing file: $file"

            # Get the file name and file extension
            FILE_NAME=$(basename "$file")
            FILE_TYPE=${FILE_NAME##*.}
            FILE_PATH=$(realpath "$file")

            # Use \lo_import to import the file as a large object and store its OID
            OID=$(psql -d your_database -Atc "\\lo_import '$FILE_PATH'")

            # Call the SQL function to insert the data into the DP_ORGANIZATION_ASSETS table
            psql -d your_database -c "SELECT insert_large_object('$FILE_NAME', '$FILE_TYPE', '$FILE_PATH', '$ORG_ID', $OID);"
        fi
    done
}

process_directory "$DIRECTORY"
