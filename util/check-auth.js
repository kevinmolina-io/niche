const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = context => {
  // context = { ...  headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // auth tokens usually has value of Bearer {token}
    const token = authHeader.split("Bearer ")[1]; // to save the actual token
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
