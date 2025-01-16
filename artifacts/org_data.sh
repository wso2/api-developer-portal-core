#!/bin/bash
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="test"
DB_USER="postgres"

# Directory containing the files
DIRECTORY="./artifacts/default/orgcontent/ACME"

# Organization data to insert
ORG_ID="1ba42a09-45c0-40f8-a1bf-e4aa7cde1575"
ORG_NAME="ACME"
BUSINESS_OWNER=""
BUSINESS_OWNER_CONTACT=""
BUSINESS_OWNER_EMAIL=""
DEV_PORTAL_URL_IDENTIFIER="ACME"
ROLE_CLAIM_NAME="roles"
GROUPS_CLAIM_NAME="groups"
ORGANIZATION_CLAIM_NAME="organizationID"
ORGANIZATION_IDENTIFIER="ACME"
ADMIN_ROLE="admin"
SUBSCRIBER_ROLE="Internal/subscriber"
SUPER_ADMIN_ROLE="superAdmin"

SQL="
INSERT INTO \"DP_ORGANIZATION\" (
    \"ORG_ID\",
    \"ORG_NAME\",
    \"BUSINESS_OWNER\",
    \"BUSINESS_OWNER_CONTACT\",
    \"BUSINESS_OWNER_EMAIL\",
    \"DEV_PORTAL_URL_IDENTIFIER\",
    \"ROLE_CLAIM_NAME\",
    \"GROUPS_CLAIM_NAME\",
    \"ORGANIZATION_CLAIM_NAME\",
    \"ORGANIZATION_IDENTIFIER\",
    \"ADMIN_ROLE\",
    \"SUBSCRIBER_ROLE\",
    \"SUPER_ADMIN_ROLE\"
) VALUES (
    '$ORG_ID',
    '$ORG_NAME',
    '$BUSINESS_OWNER',
    '$BUSINESS_OWNER_CONTACT',
    '$BUSINESS_OWNER_EMAIL',
    '$DEV_PORTAL_URL_IDENTIFIER',
    '$ROLE_CLAIM_NAME',
    '$GROUPS_CLAIM_NAME',
    '$ORGANIZATION_CLAIM_NAME',
    '$ORGANIZATION_IDENTIFIER',
    '$ADMIN_ROLE',
    '$SUBSCRIBER_ROLE',
    '$SUPER_ADMIN_ROLE'
);
"

# Execute the SQL statement using psql
psql -h "localhost" -p "5432" -U "postgres" -d "test" -c "$SQL"

# Loop through files in the directory
process_directory() {
    local DIR="$1"
    local DIR_NAME="";
    for file in "$DIR"/*; do
        if [ -d "$file" ]; then
            #echo "Entering directory: $DIR_NAME"
            process_directory "$file"
        elif [ -f "$file" ]; then
            BASE_NAME=$(dirname "$file")
            FILE_PATH=$(echo "$BASE_NAME" | sed 's|./artifacts/default/orgcontent/ACME/||')
            echo "Base name: $BASE_NAME"
            DIR_NAME=$(basename "$(dirname "$file")")
            echo "Dir name: $DIR_NAME"
            echo "Processing file: $file"

            # Get the file name and file extension
            FILE_NAME=$(basename "$file")
            if [[ "$FILE_NAME" == *.css ]]; then
                FILE_TYPE="style"
            elif [[ "$FILE_NAME" == *.hbs && "$DIR_NAME" == layout ]]; then
                FILE_TYPE="layout"
            elif [[ "$FILE_NAME" == *.hbs  && "$DIR_NAME" == partials ]]; then
                FILE_TYPE="partial"
            elif [[ "$FILE_NAME" == *.md && "$DIR_NAME" == content ]]; then
                FILE_TYPE="markDown"
            elif [[ "$FILE_NAME" == *.hbs ]]; then
                FILE_TYPE="template"
            else
                FILE_TYPE="image"
            fi
        
            echo "Processing file: $FILE_PATH"

            # Use \lo_import to import the file as a large object and store its OID
            #PATH=$(cd "$(dirname "$file")" && pwd)/$(basename "$file")

            OID=$(psql -U postgres -d test -h "localhost" -p "5432" -Atc "\lo_import '$file'" | awk '{print $NF}')

            echo "OID: $OID"

            INSERT_QUERY="INSERT INTO \"DP_ORGANIZATION_ASSETS\" (\"ASSERT_ID\", \"FILE_CONTENT\", \"FILE_NAME\", \"FILE_TYPE\", \"FILE_PATH\", \"ORG_ID\") VALUES ( gen_random_uuid(), lo_get($OID), '$FILE_NAME', '$FILE_TYPE', '$FILE_PATH', '$ORG_ID');"

            # Call the SQL function to insert the data into the DP_ORGANIZATION_ASSETS table
            # psql -q -U postgres -d test  -h  localhost -p 5432  -c "SELECT insert_large_object('$FILE_NAME', '$FILE_TYPE', '$FILE_PATH', '$ORG_ID', $OID);"
            psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "$INSERT_QUERY"
            if [ $? -eq 0 ]; then
                echo "Successfully inserted: $FILE_NAME"
            else
                echo "Failed to insert: $FILE_NAME"
            fi
        fi
    done
}

process_directory "$DIRECTORY"
