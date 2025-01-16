**Pre-requisites**  
Install Node.js v22.0.0
Install POSTGRESQL and create a database named 'devportal'.  
For more information, refer to docs/InstallationGuide.md.

**Changing the database to PostgreSQL**

1.  Navigate to the config.json file in the <DEVPORTAL_HOME> directory.
    
2.  Edit the db properties to connect to the created db.
    
```bash
db = {

    username: 'postgres',

    password: 'postgres',

    database: 'devportal',

    host: 'localhost',

    dialect: 'postgres'
}
```

**Try Out Devportal**  

1.  Run the following command to create a default organization and populate the developer portal landing page content.
    ```bash
    ./artifacts/org_data.sh
    ```

2.  Run the following command to create mock APIs and populate api landing page content.

    ```bash
    ./artifacts/api_data.sh
    ```
    To delete the mock APIs, run the following command.
    ```bash
    ./artifacts/delete_api_data.sh
    ```
3. Run the following command at the root folder to install the dependencies and start the developer portal.

    ```bash
    npm install
    ```
4.  Run the following command to start the developer portal.:
     
    ```bash
    npm start
    ```

    The default organization name is ACME.
    This will start the webapp in the following URL : ‘[http://localhost:3000/ACME](http://localhost:3000/{orgName})’

    This will direct you to the organization landing page.

    The http://localhost:3000/ACME/apis will direct you to the api listing page.

    Each of the api landing and tryout pages are available at the following URLs:
      'http://localhost:3000/ACME/api/{apiName}'
      'http://localhost:3000/ACME/api/{apiName}/tryout'


**Add a new third party API to the developer portal**

- Configure a control plane in the developer portal.
 ```bash
 curl --location 'http://localhost:3000/devportal/organizations/{{orgId}}/provider' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <<access_token>>' \
--data '{
    "name": "MuleSoft",
    "providerURL": "https://anypoint.mulesoft.com/login/signin?apintent=generic"
}'
 ```


-  Create an API in the developer portal:
    
The apiType values include REST, AsyncAPI, GraphQL or SOAP

The provider value should be the name of the control plane configured in the developer portal.

visibility - PUBLIC/PRIVATE

This is a multi part request containing a json with metadata related to the API and a file attachement of the api schema definition file.
``` bash
 curl --location 'http://localhost:devportal/organizations/{organizationID}/apis'

   --form 'api-metadata="{
                  "apiInfo": { 
                     "referenceID": "<UUID for the API created in WSO2 publisher>",
                     "apiName": "NavigationAPI",
                     "provider": "MuleSoft",
                     "orgName": "ACME",
                     "apiCategory": "Travel",
                     "apiDescription": "API for retrieving information about hotels and managing reservations",
                     "visibility" : "PRIVATE",
                     "visibleGroups": \["HR"\],
                     "owners" : {
                       "technicalOwner": "john",
                       "technicalOwnerEmail": "john@gmail.com",
                       "businessOwner" : "sam",
                       "businessOwnerEmail":"sam@gmail.com"
                     },
                     "apiVersion" : "3.0.2",
                     "apiType" : "REST"
                  },
                  "subscriptionPolicies": [
                     {
                        "policyName": "gold"
                     },
                     {
                        "policyName": "platinum"
                     }
                  ],
                  "endPoints": {
                     "sandboxURL": "http://taxi-navigation.mnm.abc.com",
                     "productionURL": "https://taxi-navigation.mnm.abc.com"
                  }
            }"; type=application/json'
   --form 'apiDefinition=@"{apiDefinition.json}"'
```
- Upload the api landing page content.

To upload the content to be displayed on the api-landing page, create a zip file with the folder structure as follows:
``` bash
{API NAME}
└───content
   │   api-content.hbs
   │   apiContent.md
└───images
   │   icon.svg
   │   product.png
```
This is a multi part request, containing the metadata about the images in the api landing page.   
This should be sent as a json key value map, with the key referring to the name in the hbs where the image is referenced and the name of the image file as the value.  
For example, the key should be sent as api-icon to display the relevant image in the following img tag.
``` bash
    <img src={{apiInfo.apiImageMetadata.api-icon}} class="api-card-img" alt="..." />

```
Run the following command to upload the content.
``` bash
curl --location --request POST 'http://localhost:3000/devportal/organizations/{organizationID}/apis/{apiID}/template'
     --form 'apiContent=@"{path-to-zip-file}"' \\
     --form 'imageMetadata="{
               \\"api-icon\\" : \\"navigation.jpeg\\",
               \\"api-hero\\": \\"api.svg\\"
            }"
```

Use this (https://devportal-4432.postman.co/workspace/Devportal-Workspace~9221a728-2c4b-46ec-acc3-095b9debacbc/collection/5029047-61d763dc-d7b9-4436-9a2e-94585c806943?action=share&creator=5029047) POSTMAN collection to test the API requests.


**To customize and theme the developer portal, follow the steps below:**
--------------------

1. Change the mode to development in the config.json file.

2. Start the developer portal by executing the following command at the root folder.
  
      ```bash
      npm start
      ``` 
3. Navigate to the organization landing page at [http://localhost:3000](http://localhost:3000/).

4. The following pages can be viewed from below urls:
- [http://localhost:3000](http://localhost:3000/) - Organization landing page
- [http://localhost:3000/apis](http://localhost:3000/apis) - API listing page
- [http://localhost:3000/api/{apiName}](http://localhost:3000/api/{apiName}) - API landing page
- [http://localhost:3000/api/{apiName}/tryout](http://localhost:3000/api/{apiName}/tryout) - API trypout page

5. The project structure is explained below:
  
  - **src**
     - The src folder contains the page layout and content including  the html, images and style sheets.
     - The /src/layout folder includes the main layout of the dev portal. Other pages inherit this layout.
     - The /src/pages folder holds the content for the pages. The html content of each page is in the src/pages directory.
     - Each directory will contain a page.hbs (src/pages/{apis/home/api-landing}/page.hbs) which contains all the partial html content of the page. The partials directory (src/pages/{apis/home/api-landing}/partials) contains the html content for each page (organization landing,api listing, api landing).
     - The /src/partials folder holds the common content for the pages. The header and footer are injected as partials into the layout.
     - The /src/images folder contains the images.  
  - **mock**
    - Includes the mock API information. Mock APIs are displayed to define the structure. In a production scenario, these will be replaced by actual published APIs.
    - Each api folder contains the api definition file, the api metadata and the content to be included in the api landing page (either md or hbs).
    - mock/apiMetadata.json Includes the metadata of the mock APIs to be displayed in the api listing page.
    - mock/auth.json Includes details about the Identity provider to be used when logging in to the dev-portal in development mode.
  **config.json**
  Configuration file for the developer portal.
  **artifacts**
  Contains the sql file to create database tables.

6. Customize the content for the organization landing, api listing and api landing pages.
   From above pages, except for the tryout page, the content can be customized by modifying the hbs files in the src/pages directory.

 **Customize a page**

To customize the content for the api-landing, api-listing or organization landing (home) pages, the relevant hbs files can be modified under the relevant folder for the page in the src/pages directory.

The styles folder (src/styles) will contain the style sheets for all the partials, named after the relevant partial file.

The css and hbs files can be edited and reloaded to view the changes to the relevant pages.

Any new style sheet that is added needs to be imported to the main.css file under the src/styles folder.

The api listing and api landing pages will contain the dynamic data injected and displayed using handlebars.

The dynamic content included for each page is given in the below json structures:

API Listing Page:
```bash
apiMetadata: [
    {
      apiID: '6d9b40b5-46a6-4777-8bde-d72e4660a307',
      apiInfo:{
            "provider": "WSO2",
            "apiName": "NavigationAPI",
            "orgName": "ACME",
            "apiVersion": "3.0.2",
            "apiDescription": "API for retrieving information about hotels and managing reservations",
            "apiType": "REST",
            "visibility": "PRIVATE",
            "visibleGroups": [
                "HR"
            ],
            "owners": {
                "technicalOwner": "john",
                "businessOwner": "sam",
                "businessOwnerEmail": "sam@gmail.com",
                "technicalOwnerEmail": "john@gmail.com"
            },
            "apiImageMetadata": {
                "api-icon": "navigation.jpeg",
                "api-hero": "api.svg"
            }
        },
        "endPoints": {
            "sandboxURL": "string",
            "productionURL": "https://taxi-navigation.mnm.abc.com"
        },
        "subscriptionPolicies": [
            {
                "policyName": "advanced"
            }        
          ]
    }
  ],
  baseUrl: '/ACME'
```
ex:  The apiMetadata can be accessed in the src/pages/apis/partiasl/api-listing.hbs page as show below:

``` bash
{{#apiMetadata}}
 <div class="card dev-card api-card lg-3 d-flex flex-column">
    <img src={{apiInfo.apiImageMetadata.api-icon}} class="api-card-img" alt="..." />
  	<div class="api-card-body flex-grow-1">
    <h5 class="api-card-title">{{apiInfo.apiName}}</h5>
    <p>V {{apiInfo.apiVersion}}</p>
    <p>{{apiInfo.apiType}}</p>
</div>
{{/apiMetadata}}

```

The baseUrl property can be used to create hrefs relative to the base url of the developer portal.

ex:
``` bash
href="{{baseUrl}}/api/{{apiInfo.apiName}}"
```

API Landing Page:
``` bash
{ apiMetadata: {
  apiID: '6d9b40b5-46a6-4777-8bde-d72e4660a307',
  apiInfo: {
    #same as above
  },
  endPoints: {
    sandboxURL: 'https://taxi-navigation.mnm.abc.com',
    productionURL: 'https://taxi-navigation.mnm.abc.com'
  },
  subscriptionPolicies: [
    { policyName: 'advanced' },
    { policyName: 'gold' },
    { policyName: 'platinum' }
  ]
},
baseUrl: '/ACME',
schemaUrl: '[http://localhost:3000/devportal/organizations/{orgID}/apis/{apiID}/template?fileName=apiDefinition.json](http://localhost:3000/devportal/organizations/{orgID}/apis/{apiID}/template?fileName=apiDefinition.json)' }
```
The schemaUrl can be used to download the api definition from the api landing page.

The api information can be accessed from the src/pages/api-landing/partials/api-detail-banner.hbs page as shown below:

``` bash
<div class="api-title">
    <h4>{{apiMetadata.apiInfo.apiName}}</h4>
    <span class="badge api-badge-custom1">{{apiMetadata.apiInfo.apiCategory}}</span>
</div>
<p> {{apiMetadata.apiInfo.apiVersion}}</p>
<p class="api-desciption">{{apiMetadata.apiInfo.apiDescription}}</p>
```
**Customize API landing page**

The mock (/mock) folder will contain each APIs content for the apis displayed in the api listing page (/apis).

An api landing page’s content can either be rendered using a markdown file or by modifying the api-content hbs file directly.

The md file is at /mock/{api-name}/apiContent.md.

The hbs file is at /mock/{api-name}/api-content.hbs

The naming conventions for the md and hbs files are as follows:

markdown: apiContent.md

HBS: api-conent.hbs

**Add a page**
 
In order to add a new page, a folder needs to be created under the pages directory, representing the relevant url path of the page in the directory structure.

  ex: [http://localhost:3000/applications/myapps](http://localhost:3000/applications/myapps)

The relevant partial files and page.hbs need to be added to a folder structure as shown below:
``` bash
 pages
  └─── applications
   └─── myapps
         └── content
             │content.md
         └─ partials
             │appConent.hbs  
         │page.hbs
```

The page.hbs file should have the following format:
``` bash
    {{> appConent }} # name of the partial hbs file
    {{{ content  }}} # name of the markdown file, if any
```
