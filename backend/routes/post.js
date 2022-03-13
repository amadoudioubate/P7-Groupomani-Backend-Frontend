// Importer les modules natifs et externes
const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const router = express.Router();

// Les routes posts
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.updateOnePost);
router.get('/', postCtrl.findAllPosts);
router.get('/:id', postCtrl.findOnePost);
router.get('/:id/comments', postCtrl.findCommentsOfPost);
router.get('/:id/likes', postCtrl.findLikesOfPost);
router.delete('/:id', postCtrl.deleteOnePost);

// Exporter router
module.exports = router;