CREATE OR REPLACE FUNCTION insert_large_object(
    file_name TEXT,
    file_type TEXT,
    file_path TEXT,
    org_id TEXT,
    lo_id OID
)
RETURNS VOID AS $$
DECLARE
    lo_data BYTEA;
BEGIN
    -- Concatenate the binary data from the large object
    SELECT string_agg(data, '' ORDER BY pageno)
    INTO lo_data
    FROM pg_largeobject
    WHERE loid = lo_id;

    -- Insert the binary data into the table
    INSERT INTO "DP_ORGANIZATION_ASSETS" (
        "ASSERT_ID", "FILE_NAME", "FILE_CONTENT", "FILE_TYPE", "FILE_PATH", "ORG_ID"
    ) VALUES (
        gen_random_uuid(), file_name, lo_data, file_type, file_path, org_id
    );

    -- Optionally delete the large object after insertion
    PERFORM lo_unlink(lo_id);
END;
$$ LANGUAGE plpgsql;
