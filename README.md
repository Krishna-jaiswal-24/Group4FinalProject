# Sriram branch description




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
