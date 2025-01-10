#!/bin/bash
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="test"
DB_USER="postgres"
 
DELETE_API="DELETE FROM \"DP_API_METADATA\";"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "$DELETE_API"
if [ $? -eq 0 ]; then
    echo "Deleted API Metadata successfully!"
else
    Echo "Failed to delete API Metadata"
fi

DELETE_API_CONTENT="DELETE FROM \"DP_API_CONTENT\";"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "$DELETE_API_CONTENT"
if [ $? -eq 0 ]; then
    echo "Deleted API Content successfully!"
else
    Echo "Failed to delete API Content"
fi

DELETE_IMAGE_METADATA="DELETE FROM \"DP_API_IMAGEDATA\";"
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "$DELETE_IMAGE_METADATA"
if [ $? -eq 0 ]; then
    echo "Deleted Image Metadata successfully!"
else
    Echo "Failed to delete Image Metadata"
fi
