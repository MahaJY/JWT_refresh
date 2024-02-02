const express = require('express');
const authController = require('../controllers/authcontrollers');
const authenticateToken = require('../middlewares/authenticatetoken');
const JWTUtils = require('../utils/JWTutils')
const router = express.Router();
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await authController.authenticateUser(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const accessToken = JWTUtils.generateaccessToken(user);
  const refreshToken = JWTUtils.generateRefreshToken();
  JWTUtils.refreshTokens[refreshToken] = user;
  res.json({ access_token: accessToken, refresh_token: refreshToken });
});
router.post('/refresh', authController.refreshToken);
router.get('/protected', authenticateToken, (req, res) => {
  const user = req.user;
  res.json({ message: 'This is a protected route', user });
});
module.exports = router;