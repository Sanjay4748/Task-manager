const jwt = require('jsonwebtoken');
const jwtSecret = 'supersecretkey123';

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    // Remove 'Bearer ' from the token string before decoding
    const decoded = jwt.verify(token.replace('Bearer ', ''),jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
