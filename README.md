# Sriram branch description

## Gateway Server token verification with Keycloak

## Overview

The folder gateway

This project sets up a *Spring Cloud Gateway* application that routes requests to backend services while integrating authentication and authorization through *Keycloak*.

The Gateway Server acts as a reverse proxy that manages routing, security, and request filtering for the backend microservices.

---

## Features

1. *Routing*:
   - Routes requests based on defined paths.
   - The example here routes requests with a rewrite filter to a course catalog backend service.

2. *Security*:
   - Uses *OAuth2* for authentication and token relay.
   - Authenticates requests with Keycloak, an open-source identity and access management solution.

3. *Logging*:
   - Configured logging for detailed debugging of Spring Cloud Gateway, Spring Security, and reactive operations.

---

## Configuration Details

### 1. *Routing Configuration*

- The Gateway defines a route with the ID CourRses-Catalog.
- Incoming requests matching the specified path (/**) are forwarded to the backend microservice at http://10.0.7.38:8000.
- Two filters are applied:
  - *RewritePath*: Modifies the request path from /api/v1/course/fetch to match the backend API's expected format.
  - *TokenRelay*: Propagates OAuth2 access tokens to the backend service for secure API calls.

---

### 2. *Security with Keycloak*

- The Gateway uses Keycloak for OAuth2 authentication.
- Configuration:
  - client-id: Specifies the Keycloak client application registered in the realm.
  - client-secret: The secret for the registered Keycloak client.
  - scope: Requests OpenID Connect (OIDC) tokens for authentication.
  - authorization-grant-type: Uses the authorization_code flow for OAuth2.
  - redirect-uri: Defines where Keycloak will send the authorization code after successful login.
  - issuer-uri: The Keycloak realm's URL for token validation and discovery.

---

### 3. *Application Properties*

| Property                           | Description                                                                                 |
|------------------------------------|---------------------------------------------------------------------------------------------|
| spring.cloud.gateway.routes      | Defines routing rules and filters for incoming requests.                                    |
| spring.security.oauth2.client    | Configures OAuth2 clients and provider information.                                         |
| server.port                      | Specifies the port where the Gateway Server listens for incoming requests (set to 7000).    |
| logging.level                    | Sets logging levels for detailed debugging of gateway, security, and reactive operations.   |

---

## How It Works

1. *Authentication Flow*:
   - Users accessing the Gateway are redirected to Keycloak for login.
   - After successful login, Keycloak sends an authorization code to the Gateway.
   - The Gateway exchanges the code for an access token and ID token from Keycloak.
   - Tokens are stored and relayed to backend services as required.

2. *Request Routing*:
   - After authentication, the Gateway forwards requests to the appropriate backend service.
   - The RewritePath filter ensures the backend API receives the correctly formatted request path.

3. *Token Propagation*:
   - The TokenRelay filter passes the authenticated user's access token to downstream services, ensuring secure communication.

---

## Prerequisites

1. *Keycloak Setup*:
   - A Keycloak realm and client configured for the Gateway.
   - Redirect URI: http://10.0.4.193:7000/login/oauth2/code/{registrationId}.
   - Client type: confidential with the authorization_code grant type enabled.

2. *Backend Service*:
   - A backend microservice running at http://10.0.7.38:8000 that expects authenticated requests.

---

## Running the Application

1. Clone the repository and navigate to the project directory.
2. Ensure Keycloak is running and configured with the correct client settings.
3. Update the application.yml file with the correct Keycloak issuer URI, client ID, and secret.
4. Build and run the application:
   ```bash
   ./mvnw spring-boot:run



## Keycloak Authentication Middleware

Middleware for validating JSON Web Tokens (JWTs) issued by Keycloak using `express-jwt` and `jwks-rsa`.

```
import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import 'dotenv/config';

const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;

const jwksClient = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`,
});

export const authenticationToken = expressjwt({
  secret: jwksClient,
  algorithms: ['RS256'],
  issuer: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
});

export const unauthorizedErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token or no token provided' });
  } else {
    next(err);
  }
};

```

## Explanation of the Code

### Environment Variables
The following environment variables are used in the code:
- **`KEYCLOAK_REALM`**: Specifies the Keycloak realm issuing the tokens.
- **`KEYCLOAK_URL`**: The base URL of the Keycloak server.

### JWKS Client Setup
The `jwksClient` is configured using `jwks-rsa` to fetch public keys dynamically:
- **Caching**: Public keys are cached for improved performance.
- **Rate Limiting**: Limits requests to 5 per minute to prevent excessive requests to the Keycloak server.
- **JWKS URI**: Constructed using `KEYCLOAK_URL` and `KEYCLOAK_REALM` to point to Keycloak's JWKS endpoint.

### JWT Validation Middleware
The `authenticationToken` middleware performs token validation:
- **Public Key Retrieval**: Uses the `jwksClient` to fetch public keys for signature verification.
- **Algorithms**: Enforces the `RS256` algorithm.
- **Issuer Validation**: Ensures the token's `iss` claim matches the Keycloak issuer URL.
- **Token Extraction**: Implements a custom function to extract the token from the `Authorization` header.

### Error Handling Middleware
The `unauthorizedErrorHandler` middleware handles errors during token validation:
- **Unauthorized Errors**: Returns a `401 Unauthorized` status with a descriptive error message for invalid or missing tokens.
- **Other Errors**: Forwards non-authentication-related errors to the next middleware in the chain.

This code ensures secure validation of JWTs issued by Keycloak before granting access to protected resources.
