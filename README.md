## Prerequisites

- **Node.js**: v22.0.0
- **PostgreSQL**: v14+

---

## Quick start (Docker)

The fastest way to run the portal. No manual DB setup or schema scripts needed — everything is auto-initialized on first startup.

**1. Copy the example config files:**

```bash
cp config.yaml.example config.yaml
cp sample_secret.yaml secret.yaml
```

**2. Set your DB password and org name in `secret.yaml` and `config.yaml`:**

`secret.yaml`:
```yaml
db:
  password: "yourpassword"
```

`config.yaml`:
```yaml
portal:
  orgName: MyCompany   # optional — defaults to ACME
```

**3. Start with Docker Compose:**

```bash
docker compose up
```

> If the portal image is published to Docker Hub, update `docker-compose.yml` to use the published image name and remove the local `build:` section. For example:
>
> ```yaml
> image: your-dockerhub-user/api-developer-portal-core:latest
> ```
>
On first startup the portal will:
- Wait for PostgreSQL to be ready
- Create the DB schema automatically
- Create the default organization (ACME or your configured name) with default view, labels, and subscription policies

**4. Open the portal:**

```
http://localhost:3000/ACME/views/default
```

(replace `ACME` with the handle derived from your org name)

---

## Local development (npm start)

### 1. Create config files

```bash
cp config.yaml.example config.yaml
cp sample_secret.yaml secret.yaml
```

`config.yaml` and `secret.yaml` are gitignored — never commit them.

### 2. Configure `config.yaml`

Minimum required changes for local HTTP:

```yaml
baseUrl: "http://localhost:3000"
defaultPort: 3000

advanced:
  http: true

db:
  host: localhost
  username: postgres
  database: devportal
```

### 3. Configure `secret.yaml`

```yaml
db:
  password: "yourpassword"
```

### 4. Configure Identity Provider (login)

Update `identityProvider` in `config.yaml` to point to your IdP:

```yaml
identityProvider:
  issuer: "https://your-idp.example.com/oauth2/token"
  authorizationURL: "https://your-idp.example.com/oauth2/authorize"
  tokenURL: "https://your-idp.example.com/oauth2/token"
  jwksURL: "https://your-idp.example.com/oauth2/jwks"
  clientId: "your-client-id"
  callbackURL: "http://localhost:3000/ACME/callback"
  logoutURL: "https://your-idp.example.com/oidc/logout"
```

### 5. Database setup

Create the database:

```bash
createdb -h localhost -U postgres devportal
```

Or run PostgreSQL via Docker:

```bash
docker run --name devportal-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=devportal \
  -p 5432:5432 \
  -d postgres:16
```

The schema and default org are created automatically on first `npm start`. No need to run any SQL scripts manually.

### 6. Install and run

```bash
npm install
npm start
```

### 7. Verify

```
http://localhost:3000/ACME/views/default
```

---

## Configuration reference

### Priority order

```
DP_* environment variables   (highest — for CI/CD, Kubernetes secrets)
secret.yaml                  (secrets — gitignored)
config.yaml                  (your overrides — gitignored)
sample_config.yaml           (built-in defaults — committed)
```

### Key files

| File | Purpose | Committed? |
|---|---|---|
| `sample_config.yaml` | Built-in defaults | Yes |
| `sample_secret.yaml` | Secrets template | Yes |
| `config.yaml` | Your config overrides | No (gitignored) |
| `secret.yaml` | Your secrets | No (gitignored) |
| `config.yaml.example` | Full reference with comments | Yes |

### `DP_*` environment variables

| Variable | Description |
|---|---|
| `DP_DB_HOST` | PostgreSQL host |
| `DP_DB_PORT` | PostgreSQL port |
| `DP_DB_USER` | PostgreSQL username |
| `DP_DB_PASSWORD` | PostgreSQL password |
| `DP_DB_NAME` | PostgreSQL database name |
| `DP_PORTAL_ORG_NAME` | Default org name on first startup |
| `DP_BASE_URL` | Portal base URL |
| `DP_OIDC_ISSUER` | OIDC issuer URL |
| `DP_OIDC_CLIENT_ID` | OIDC client ID |
| `DP_OIDC_AUTH_URL` | OIDC authorization URL |
| `DP_OIDC_TOKEN_URL` | OIDC token URL |
| `DP_OIDC_CALLBACK_URL` | OIDC callback URL |
| `DP_OIDC_LOGOUT_URL` | OIDC logout URL |
| `DP_OIDC_JWKS_URL` | OIDC JWKS URL |

See [`config.yaml.example`](config.yaml.example) for the full list of configurable fields.

---

## Seed sample data (optional)

The default org, views, labels, subscription policies, and all page templates/assets (layouts, CSS, images) are seeded automatically on first startup. No manual scripts needed for the portal to render.

If you also want sample APIs and additional theming assets:

```bash
./artifacts/api_data.sh
```

If these scripts prompt for the DB password you can prefix `PGPASSWORD`:

```bash
PGPASSWORD=yourpassword ./artifacts/api_data.sh
```

If you get a permission error:

```bash
chmod +x artifacts/*.sh
```

To remove the seeded sample APIs:

```bash
./artifacts/delete_api_data.sh
```

---

## Add a third-party API (Admin APIs)

Use the Admin REST APIs to configure providers and add APIs programmatically.

### 1. Configure a provider (control plane)

```bash
curl --location 'http://localhost:3000/devportal/organizations/{orgId}/provider' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  --data '{
    "name": "MuleSoft",
    "providerURL": "https://anypoint.mulesoft.com/login/signin"
  }'
```

### 2. Create an API (metadata + definition file)

- `apiType` can be `REST`, `AsyncAPI`, `GraphQL`, or `SOAP`

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

### 3. Upload API landing page content (optional)

Create a zip with this structure:

```
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

### Postman collection

- [Devportal Postman collection](https://devportal-4432.postman.co/workspace/Devportal-Workspace~9221a728-2c4b-46ec-acc3-095b9debacbc/collection/5029047-61d763dc-d7b9-4436-9a2e-94585c806943?action=share&creator=5029047)
