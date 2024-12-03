Setup Guidelines
--------------
Follow the steps given in InstallationGuide.md, to create database.

1.  Download the developer portal.
    
2.  Extract the downloaded zip.

3.  Execute the data-dump.sql script in the artifacts folder to populate the database with mock data.
    ```bash
    psql -q -U "{db_username}" -d "{db_name}" -h "{hostname}" -p "{port}" -f "{path to data-dump.sql}"
    ```
    
4.  Execute the startup script on the root, based on the OS:
    
    ```bash
    For Linux or MacOS
        sh startup.sh
    For Windows
       startup.bat 
    ```
The default organization name is ACME.
This will start the webapp in the following URL : ‘[http://localhost:3000/ACME](http://localhost:3000/{orgName})’

This will direct you to the organization landing page.

The ‘[http://localhost:3000/ACME](http://localhost:3000/{orgName})/apis’ will direct you to the api listing page.

Each of the api landing and tryout pages are available at the following URLs:
  'http://localhost:3000/ACME/api/{apiName}'
  'http://localhost:3000/ACME/api/{apiName}/tryout'

Local Setup
--------------

To try the setup locally please refer https://github.com/wso2/api-developer-portal