import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import 'dotenv/config';

const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;

// JWKS client to fetch public keys from Keycloak
const jwksClient = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`, // Hardcoded JWKS URI
});

// JWT validation middleware
export const authenticationToken = expressjwt({
  secret: jwksClient,
  algorithms: ['RS256'],
  issuer: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`, // Hardcoded issuer
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
});

// Error handler for unauthorized requests
export const unauthorizedErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token or no token provided' });
  } else {
    next(err);
  }
};

