// Importer les modules natifs et externes
const express = require('express');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');


const router = express.Router();

// Les routes users
router.get('/', userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);
router.put('/:id', multer, userCtrl.updateOneUser);
router.delete('/:id', userCtrl.deleteOneUser);

// Exporter router
module.exports = router;