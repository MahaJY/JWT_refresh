const jwt = require('jsonwebtoken');
const userModel = require('../models/empmodels'); 
const jwtUtils = require('../utils/JWTutils');
const authenticateUser = async (username, password) => {
  const user = await userModel.getUserByCredentials(username, password);
  return user[0];
};
const refreshToken = (req, res) => {
  const refreshToken = req.body.refresh_token;
  if (!refreshToken || !jwtUtils.refreshTokens[refreshToken]) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
const userData = jwtUtils.refreshTokens[refreshToken];
  const accessToken = jwtUtils.generateaccessToken(userData);
  res.json({ access_token: accessToken });
};
module.exports = {
 authenticateUser,
  refreshToken,
};