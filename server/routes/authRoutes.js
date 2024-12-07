const express = require('express');
const passport = require('passport');
const router = express.Router();
const { register, login, logout, verifyToken } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, send the user and token
      const token = generateToken(req.user); // Your method to generate JWT
      res.redirect(`http://localhost:3000/events?token=${token}`);
    }
  );
  
module.exports = router;