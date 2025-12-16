## Prerequisites

- **Node.js**: v22.0.0
- **PostgreSQL**

## Required files

The app expects a `config.json` and `secret.json` in the repo root.

Create them from the samples:

```bash
cp sample_config.json config.json
cp sample_secret.json secret.json
```

## Connect to the Dev environment

If you want to connect to the **Dev environment**, you need to replace your local `config.json` and `secret.json` with the **Dev Devportal** versions.

- Request the **Dev** `config.json` and `secret.json` from the team.
- Request the required **certificate(s) / key file(s)** from the team as well (if the Dev setup uses TLS/SSL).
- Replace the files in the repo root:
  - `./config.json`
  - `./secret.json`

If the Dev configuration uses certificates/keys, place the provided files at the paths referenced in your `config.json` (e.g., `pathToDBCert`, `serverCerts.*`). The Dev config typically points under `./resources/security/`, so if you keep those values, create the folder:

```bash
mkdir -p resources/security
```

Then copy the provided cert/key files into that folder.

### Install and run

```bash
npm install
npm start
```

### TLS / self-signed certificate errors (PostgreSQL)

If you see an error like `self-signed certificate in certificate chain` coming from Sequelize when connecting to Postgres, you can **temporarily** test the connection by relaxing TLS validation for the DB connection:

- Open `src/db/sequelize.js`
- In the `ssl` options passed to Sequelize, change:
  - from: `rejectUnauthorized: true,`
  - to: `rejectUnauthorized: false,`

**Important:** this is only for local troubleshooting. **Do not commit** `rejectUnauthorized: false` to the repo; revert it back to `true` (or reset the file) once you’ve validated your setup.


If you are connecting to the **Dev environment**, you can skip everything below in this README.

## Local Setup

### Configure `config.json`

For local development, it’s easiest to run over **HTTP** (no cert files needed). Update these keys in the config.json:

```json
{
  "advanced": {
    "http": true
  },
  "baseUrl": "http://localhost:3000",
  "defaultPort": 3000
}
```

### Configure Identity Provider (login)

The login flows depend on the Identity Provider settings in `config.json` under `identityProvider`. If these values are incorrect (or left as empty strings), the login flow will fail.

In the sample configs, the IdP endpoints often point to `https://localhost:9443/...` (a local Identity Server). If you don’t have an IdP running there, update the following keys to match your actual IdP:

- `identityProvider.issuer`
- `identityProvider.authorizationURL`
- `identityProvider.tokenURL`
- `identityProvider.userInfoURL`
- `identityProvider.jwksURL`
- `identityProvider.clientId`
- `identityProvider.callbackURL` (should match your app URL)

### Database setup

#### 0) Create database

Create a database named `devportal`:

```bash
createdb -h <HOST> -U <USER> devportal
```

Or, run PostgreSQL using Docker and create the database:

```bash
docker run --name devportal-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=devportal \
  -p 5432:5432 \
  -d postgres:16
```

For the DB user, make sure it can connect to `devportal` and has privileges to create tables.

#### 1) Update DB config (`config.json` and `secret.json`)

Update `config.json` with your postgres DB connection details (example):

```json
{
  "db": {
    "username": "postgres",
    "password": "postgres",
    "database": "devportal",
    "host": "localhost",
    "port": 5432,
    "dialect": "postgres"
  }
}
```

Make sure the **DB password** is also set in `secret.json` as `dbSecret` with the same value you use for Postgres (for example, if you used `POSTGRES_PASSWORD=postgres` in Docker, set `"dbSecret": "postgres"`).

#### 2) Create tables

Run the schema script.

Note: the schema script drops and recreates tables, so don’t run it against a DB you can’t reset.

```bash
psql -h <HOST> -p <PORT> -U <USER> -d devportal -f artifacts/script.sql
```
#### 3) Seed sample data (optional)

Only run this section if you want sample content (ACME org + sample APIs) and the default theming assets.

From the repo root:

```bash
./artifacts/org_data.sh
./artifacts/api_data.sh
./artifacts/theme_data.sh
```

If these scripts prompt for the DB password, you can also run them non-interactively by prefixing `PGPASSWORD`:

```bash
PGPASSWORD=<DB_PASSWORD> ./artifacts/<file.sh>
```

If you get a permission error (e.g. `permission denied`), run:

```bash
chmod +x artifacts/*.sh
```

- `org_data.sh`: seeds a default org with handle **ACME**, creates a default view/label, and uploads the default org layout/assets into the DB.
- `api_data.sh`: seeds sample APIs and uploads sample API content/assets into the DB.
- `theme_data.sh`: uploads the default theme/styling assets into the DB (theming).

To delete the seeded APIs:

```bash
./artifacts/delete_api_data.sh
```

### Install and run

```bash
npm install
npm start
```

### Verify

Open:
- `http://localhost:3000/ACME/views/default`




## Add a third-party API (Admin APIs)

If you want to add real APIs (instead of the sample seed scripts), you can use the Devportal Admin APIs to:

- Configure a **provider** (control plane)
- Create an **API** (metadata + API definition upload)
- Upload **API landing page content** (templates/assets)

These requests typically require:

- `orgId` / `organizationID` / `apiID` (depending on the endpoint)
- `Authorization: Bearer <access_token>`

#### 1) Configure a provider (control plane)

```bash
curl --location 'http://localhost:3000/devportal/organizations/{orgId}/provider' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  --data '{
    "name": "MuleSoft",
    "providerURL": "https://anypoint.mulesoft.com/login/signin?apintent=generic"
  }'
```

#### 2) Create an API (metadata + definition file)

Notes:

- `apiType` can be `REST`, `AsyncAPI`, `GraphQL`, or `SOAP`
- `provider` should match the provider name configured above
- This is a multipart request: JSON metadata + an API definition file upload

```bash
curl --location 'http://localhost:3000/devportal/organizations/{organizationID}/apis' \
  --header 'Authorization: Bearer <access_token>' \
  --form 'api-metadata="{
    \"apiInfo\": {
      \"apiName\": \"NavigationAPI\",
      \"provider\": \"MuleSoft\",
      \"orgName\": \"ACME\",
      \"apiType\": \"REST\",
      \"apiVersion\": \"1.0.0\",
      \"apiDescription\": \"<description>\",
      \"visibility\": \"PUBLIC\"
    }
  }"; type=application/json' \
  --form 'apiDefinition=@"{path-to-apiDefinition.json}"'
```

#### 3) Upload API landing page content (optional)

Create a zip with this structure:

```text
{API NAME}/
  content/
    api-content.hbs
    apiContent.md
  images/
    icon.svg
    product.png
```

Then upload it:

```bash
curl --location --request POST 'http://localhost:3000/devportal/organizations/{organizationID}/apis/{apiID}/template' \
  --header 'Authorization: Bearer <access_token>' \
  --form 'apiContent=@"{path-to-zip-file}"' \
  --form 'imageMetadata="{
    \"api-icon\": \"icon.svg\",
    \"api-product\": \"product.png\"
  }"; type=application/json'
```

#### Postman collection

Use this Postman collection to test the Admin API requests:

- [Devportal Postman collection](https://devportal-4432.postman.co/workspace/Devportal-Workspace~9221a728-2c4b-46ec-acc3-095b9debacbc/collection/5029047-61d763dc-d7b9-4436-9a2e-94585c806943?action=share&creator=5029047)


