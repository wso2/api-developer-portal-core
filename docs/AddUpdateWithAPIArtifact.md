Add/Update API with API Artifact
==============================

This guide describes how to create or update APIs using a single `apiArtifact` upload.

Supported endpoints
-------------------

- Create API (org): `POST /devportal/organizations/{organizationID}/apis`
- Create API (S2S): `POST /devportal/apis`
- Update API (org): `PUT /devportal/organizations/{organizationID}/apis/{apiID}`
- Update API (S2S): `PUT /devportal/apis/{apiID}`

Multipart field
---------------

Use the multipart field below:

- `apiArtifact`: zip file containing metadata, definition, and optional content.

Recommended artifact structure
------------------------------

```text
manifest.yaml                       # optional
devportal-api.yaml                  # required (metadata)
devportal-api-definition.yaml       # required (API definition)
docs/                               # optional (markdown docs)
apiContent/                         # optional (landing files + images)
```

Optional `manifest.yaml`
------------------------

Use this only if your artifact uses non-default paths.

```yaml
apiMetadataPath: devportal-api.yaml
apiDefinitionPath: devportal-api-definition.yaml
docsPath: docs
apiContentPath: apiContent
```

Sample `devportal-api.yaml`
---------------------------

```yaml
apiVersion: devportal.api-platform.wso2.com/v1
kind: RestApi # RestApi | WS | GraphQL | SOAP | WebSubApi

metadata:
  name: pizzashack-api-v1.0   # internal API handle

spec:
  displayName: PizzaShackAPI
  version: 1.0.0
  description: This is a simple API for Pizza Shack
  provider: WSO2
  # referenceID: <uuid-from-control-plane>

  tags:
    - pizza

  labels:
    - default

  subscriptionPolicies:
    - Gold
    - Bronze

  visibility: PRIVATE
  visibleGroups:
    - HR

  businessInformation:
    businessOwner: Jane Roe
    businessOwnerEmail: marketing@pizzashack.com
    technicalOwner: John Doe
    technicalOwnerEmail: architecture@pizzashack.com

  endpoints:
    sandboxUrl: https://sand.example.com/pizzashack/v1/api/
    productionUrl: https://prod.example.com/pizzashack/v1/api/
```

Create with artifact (example)
------------------------------

```bash
curl --location --request POST 'http://localhost:3000/devportal/organizations/{organizationID}/apis' \
  --header 'Authorization: Bearer <access_token>' \
  --form 'apiArtifact=@"{path-to-api-artifact.zip}"'
```

Update with artifact (example)
------------------------------

```bash
curl --location --request PUT 'http://localhost:3000/devportal/organizations/{organizationID}/apis/{apiID}' \
  --header 'Authorization: Bearer <access_token>' \
  --form 'apiArtifact=@"{path-to-api-artifact.zip}"'
```

Update behavior summary
-----------------------

- Metadata is updated from `devportal-api.yaml`.
- API definition is updated from `devportal-api-definition.yaml`.
- Subscription policy mappings are replaced by the artifact values.
- For docs, API landing content, and images:
  - if a file/item in the artifact already exists, it is updated
  - if it does not exist, it is created
  - if it is not included in the artifact, the existing item is kept as-is (not deleted)
