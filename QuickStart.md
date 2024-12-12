Pre-requisites
--------------
Follow the steps given in InstallationGuide.md, to create database.

1.  Download the developer portal.
    
2.  Extract the downloaded zip.

3.  Execute the data-dump.sql script in the artifacts folder to populate the database with mock data.
    ```bash
    psql -q -U "{db_username}" -d “devportal" -h "{hostname}" -p "{port}" -f {path to data-dump.sql}
    ```
    
4.  Execute the startup script on the <DEVPORTAL_HOME>/bin folder, based on the OS:
     
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

4. The extracted folder contains the following:

  **bin** 
   - **startup.sh, startup.bat**  
     Script to start the developer-portal  
    **config.json**  
     Configuration file for the developer portal.  
    **artifacts**  
      - script.sql file to create database tables.
      - data-dump.sql file to populate the database with mock data during startup.


**To customize and theme the developer portal, follow the steps below:**

1. Fork and clone the github repository: https://github.com/wso2/api-developer-portal 

2. Pre rquisites - Node.

3. Run the following command at the root folder to install the dependencies and start the developer portal.

    ```bash
    npm install
    ```

4. Start the developer portal by executing the following command at the root folder.
  
      ```bash
      npm start
      ```
 
5. Navigate to the organization landing page at [http://localhost:3000](http://localhost:3000/).

6. The following pages can be viewed from below urls:
- [http://localhost:3000](http://localhost:3000/) - Organization landing page
- [http://localhost:3000/apis](http://localhost:3000/apis) - API listing page
- [http://localhost:3000/api/{apiName}](http://localhost:3000/api/{apiName}) - API landing page
- [http://localhost:3000/api/{apiName}/tryout](http://localhost:3000/api/{apiName}/tryout) - API trypout page

7. The project structure is explained below:
  
  **src**
  - The src folder contains the page layout and content including  the html, images and style sheets.
  - The /src/layout folder includes the main layout of the dev portal. Other pages inherit this layout.
  - The /src/pages folder holds the content for the pages. The html content of each page is in the src/pages directory.
  - Each directory will contain a page.hbs (src/pages/{apis/home/api-landing}/page.hbs) which contains all the partial html content of the page. The partials directory (src/pages/{apis/home/api-landing}/partials) contains the html content for each page (organization landing,api listing, api landing).
  - The /src/partials folder holds the common content for the pages. The header and footer are injected as partials into the layout.
  - The /src/images folder contains the images.  
  **mock**
  - Includes the mock API information. Mock APIs are displayed to define the structure. In a production scenario, these will be replaced by actual published APIs.
  - Each api folder contains the api definition file, the api metadata and the content to be included in the api landing page (either md or hbs).
  - mock/apiMetadata.json Includes the metadata of the mock APIs to be displayed in the api listing page.
  - mock/auth.json Includes details about the Identity provider to be used when logging in to the dev-portal in development mode.
  **config.json**
  Configuration file for the developer portal.
  **artifacts**
  Contains the sql file to create database tables.

5. Customize the content for the organization landing, api listing and api landing pages.
   From above pages, except for the tryout page, the content can be customized by modifying the hbs files in the src/pages directory.

Customize a page
----------------
To customize the content for the api-landing, api-listing or organization landing (home) pages, the relevant hbs files can be modified under  
the relevant folder for the page in the src/pages directory.

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
            "apiName": "NavigationAPI",
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
            "sandboxUrl": "string",
            "productionUrl": "https://taxi-navigation.mnm.abc.com"
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
href="{{baseUrl}}/api/{{apiInfo.apiName}}">Overview
```

API Landing Page:
``` bash
{ apiMetadata: {
  apiID: '6d9b40b5-46a6-4777-8bde-d72e4660a307',
  apiInfo: {
    #same as above
  },
  endPoints: {
    sandboxUrl: 'https://taxi-navigation.mnm.abc.com',
    productionUrl: 'https://taxi-navigation.mnm.abc.com'
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
Customize API landing page
--------------------------
The mock (/mock) folder will contain each APIs content for the apis displayed in the api listing page (/apis).

An api landing page’s content can either be rendered using a markdown file or by modifying the api-content hbs file directly.

The md file is at /mock/{api-name}/apiContent.md.

The hbs file is at /mock/{api-name}/api-content.hbs

The naming conventions for the md and hbs files are as follows:

markdown: apiContent.md

HBS: api-conent.hbs

Add a page
----------  
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

Configure login
---------------
To test a user login to the developer portal, the auth.json file in the mock folder can be modified to include the identity provider details.

Promote to production
---------------------

After customizing the content, run “sh compress.sh {nameOfOrg}”, to create a zip file including the customized hbs, image and style files into a zip named after the name of the organization.

Follow the instructions in the [installation guide](https://docs.google.com/document/d/10bIEggNZmHy0oMLGBi_fsszXYYfcztaSt_p2i_3VcPo/edit?pli=1&tab=t.3roll6bfs18k) to setup the database and connect the devportal to it.

**Configure WSO2 as the control plane**

1. Create the IDP for devportal login

**Add claim mappings**  
Go to claims->Add->Add new external claim  
Dialect URI as http://wso2.org/oidc/claim.  
External Clam URI : organizationID  
Mapped Local Claim: http://wso2.org/claims/organization

Go to claims -> List ->  http://wso2.org/oidc/claim.  
Select roles and press edit.  
For the Mapped Local Claim, select http://wso2.org/claims/role

**Add users and roles**

Create super admin role
Got Users and Roles -> Add -> Add new role.  
Give a role name (superAdmin).  
Select all permissions.  
Click finish

Got Users and Roles -> Add -> Add user

Create a new user and assign superAdmin and admin role.  
Create another user with Internal/subscriber permissions.

**Add claims to OIDC scopes**

Goto OIDC scopes->List.  
Click on Add claims for openid.  
Click Add OIDC claim  
Select organizationID and roles as the claim uri


**Add Service Provider**

Goto Service Providers - > Add.  
Give a name and click register.  
Click on claim configuration and select Add claim URI  
Add the following claims

|Service Provider Claim | Local Claim                         | Requested claim  |
|:-------------         |:------------:                       |-------------:    |
| OrganizationID        | http://wso2.org/claims/organization | true             |
| Roles                 | http://wso2.org/claims/role         | true             |
| Username              | http://wso2.org/claims/username     |                  |

Select Username as the Subject Claim URI.

Under inbound authentication configuration, select Oauth and click configure.  
Select code as the grant type.  
Enter the following as the redirect URL:  
regexp=(https://localhost:9443/devportal/services/auth/callback/login|https://localhost:9443/devportal/services/auth/callback/logout|http://localhost:3000/{ORGNAME}/callback|http://localhost:3000/{ORGNAME})

Select PKCE mandatory, Support PKCE 'Plain' Transform Algorithm, Renew Refresh Token and  Allow authentication without the client secret.

Select JWT as the token issuer.

Click update.

**Update the config json**

```bash
 "identityProvider" : {
    "name": "<IDP_Name>",
    "issuer": "<IDP_Issuer>,
    "authorizationURL": "https://<IDP_DOMAIN>/oauth2/authorize",
    "tokenURL": "https://<IDP_DOMAIN>/oauth2/token",
    "userInfoURL": "https://<IDP_DOMAIN>/oauth2/userinfo",
    "clientId": "<Clinet_ID>",
    "callbackURL": "http://localhost:3000/ACME/callback",
    "scope": "openid email groups",
    "signUpURL": "<IDP_SignUP_URL>",
    "logoutURL": "https://<IDP_DOMAIN>/oidc/logout",
    "logoutRedirectURI": "http://localhost:3000/ACME"
},
"roleClaim": "roles", 
"orgIDClaim": "organizationID",
"groupsClaim": "groups",
"adminRole": "admin",
"subscriberRole": "Interna/subscriber",
"superAdminRole": "superAdmin",
````
API request for creating IDP in developer portal
``` bash
curl --location --request POST 'http://localhost:3000/devportal/organizations/{organizationID}/identityProvider' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AhKQhm7b2bCe4RkJuFknvUsxVqgG_iueA.ddy6vv265vp0cRrpRoJMnYZWs11tRTNsT0MKtTyIQ4o' \
--data '{
    "name": "<IDP_Name>",
    "issuer": "<IDP_Issuer>",
    "authorizationURL": "https://<IDP_DOMAIN>/oauth2/authorize",
    "tokenURL": "https://<IDP_DOMAIN>/oauth2/token",
    "userInfoURL": "https://<IDP_DOMAIN>/oauth2/userinfo",
    "clientId": "<Clinet_ID>",
    "callbackURL": "http://localhost:3000/ACME/callback",
    "scope": "openid email groups",
    "signUpURL": "<IDP_SignUP_URL>",
    "logoutURL": "https://<IDP_DOMAIN>/oidc/logout",
    "logoutRedirectURI": "http://localhost:3000/ACME"
}'
```

2.  Configure APIM CP URL.  

```bash
controlPlane : {
    "url": "https://127.0.0.1:9443/api/am/devportal/v3"
  }
```
3.  Go to APIM publisher adn publish an API (https://localhost:9443/publisher)

4.  Store the created API metadata in developer portal side, as mentioned in step 5 of the below section.  


Follow the steps below to populate the organization’s content in the developer portal.

1.  Create an organization in the developer portal.

Login to the developer portal using the credentials of the user with superAdmin role.
Navigate to 'http://localhost:3000/portal' and create the organization.

Enter the following information:
```bash
       "orgName": "ACME",
       "businessOwner": "John Doe",
       "businessOwnerContact": "+94-76-123-456",
       "businessOwnerEmail": "john.doe@example.com",
       "devPortalURLIdentifier": "myPortal", //customize URL for the devportal.  
       "roleClaimName": <claim name for the user roles>.  
       "groupsClaimName": <claim name for the user groups>.  
       "organizationClaimName": <claim name for the organization identifier>.  
       "organizationIdentifier": <value for the organization identifier>.  
       "adminRole": <admin role name>. 
       "subscriberRole": <subscriber role name>.  
       "superAdminRole": <super admin role name>
```

    
``` bash
curl --location --request POST 'http://localhost:3000/devportal/organizations' 

   --header 'Content-Type: application/json'
   --data-raw '{
       "orgName": "ACME",
       "businessOwner": "John Doe",
       "businessOwnerContact": "+94-76-123-456",
       "businessOwnerEmail": "john.doe@example.com"
}'
```

2.  Upload the generated zip with the organization content.
    
Login to the developer portal using the credentials of the user with superAdmin role.  
Navigate to 'http://localhost:3000/{orgName}/configure' and upload the zip.

``` bash
curl --location --request POST 'http://localhost:3000/devportal/organizations/{orgID}/layout' 
--form 'file=@{pathToZipFile}
```

3. Click on configure IDP and add IDP details for the organization.


4.  Navigate to [http://localhost:3000/{orgName](http://localhost:3000/{orgName)}.
    
The organization landing page will include the uploaded content.
The /apis page will render the page with no apis, since no API content is uploaded yet.Follow the steps below to populate the api details in the developer portal.

5.  Create an API in the developer portal:
    
The apiType values include REST, AsyncAPI, GraphQL or SOAP

This is a multi part request containing a json with metadata related to the API and a file attachement of the api schema definition file.
``` bash
 curl --location 'http://localhost:devportal/organizations/{organizationID}/apis'

   --form 'api-metadata="{
                  "apiInfo": { 
                     "referenceID": "<UUID for the API created in WSO2 publisher>",
                     "apiName": "NavigationAPI",
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

6. Upload the api landing page content. 

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
