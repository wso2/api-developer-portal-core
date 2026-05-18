# Echo API Key Sample

This sample API proxies an echo service through the Platform Gateway and requires API key authentication.

Use the `X-API-Key` header to authorize requests.

## Gateway endpoints

- `GET /get`
- `POST /post`
- `GET /status/{code}`

## Notes

- The API definition uses a relative server path of `/echo`.
- The configured gateway URLs are `http://localhost:8080/echo` for both sandbox and production.
- The API key must be passed in the `X-API-Key` header on every request.
