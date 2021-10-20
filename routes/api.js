const express = require('express');
const router = express.Router();
const userController = require('../controllers/userscontroller');
const authController = require('../controllers/authcontroller');
const authMw = require('../config/apiauth');

// User Routes
router.post('/', (req, res) => res.status(200).json({ status: 200, data: 'API Running' }));
router.post('/users/register', userController.register_post);
router.post('/users/login', authController.login_post);
router.get('/users/me', authMw.ensureAuthenticated, authController.me_get);

module.exports = router;
