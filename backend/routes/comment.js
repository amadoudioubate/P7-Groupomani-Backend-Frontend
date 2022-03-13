// Importer les modules natifs et externes
const express = require('express');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router();

// Les routes commentaires
router.get('/', commentCtrl.findAllComments);
router.get('/:id', commentCtrl.findOneComment);
router.post('/', commentCtrl.createComment);
router.put('/:id', commentCtrl.updateOneComment);
router.delete('/:id',  commentCtrl.deleteOneComment);

// Exporter router
module.exports = router;