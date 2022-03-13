// Importer les modules natifs et externes
const express = require('express');
const authCtrl = require('../controllers/auth');
const multer = require('../middleware/multer-config');
const max = require('../middleware/limit');

const router = express.Router();

// Routes connexion, inscription et déconnexion
router.post('/signup', multer, authCtrl.signup);
router.post('/login', max.limiter, authCtrl.login);
router.get("/logout", authCtrl.logout);

// Exporter router
module.exports = router;