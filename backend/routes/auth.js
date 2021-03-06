const express = require('express');
const authcontrol = require('../controllers/authcontroller')
const router = express.Router();

router.post('/signup', authcontrol.signup);

router.post('/login', authcontrol.login);

module.exports = router;