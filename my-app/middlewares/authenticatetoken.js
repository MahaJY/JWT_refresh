const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/JWTutils');
module.exports= (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token is missing or invalid format' });
  }
const token = authorizationHeader.split(' ')[1];
jwt.verify(token, secretKey, (err,user) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ error: 'Invalid access token' });
    }
    console.log('Token verified successfully:', user);
    req.user = user;
    next();
  });
};

