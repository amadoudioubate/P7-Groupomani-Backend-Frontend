// Importer les modules natifs et externes
const fs = require('fs');
const validate = require('validator');
const { Post, Like, Comment } = require('../models');

// Créer un post
exports.createPost = (req, res, next) => {
    // Si champ title et content sont vides
    // if(validate.isEmpty(req.body.title) || validate.isEmpty(req.body.content)) {
    //     return res.status(400).json('Champ obligatoire')
    // }

    // Création du post
    Post.create({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        likes: 0,
        dislikes: 0,
        UserId: req.body.UserId
    })
     .then(() => res.status(201).json({ message: `Le post est crée avec succès !` }))
     .catch(error => { // Si create sur Post échoue
         const message = `Le post n'a pas pu être crée. Réessayez dans quelques instants.`;
         res.status(500).json({ message, error: error });
     });
};

// Récuperer tous les posts
exports.findAllPosts = (req, res, next) => {
    Post.findAll()
        .then(postsFounds => { // Promesse retournée Si findAll sur Post se passe bien
            if(!postsFounds) { // Si posts n'existent pas
                return res.status(404).json({ error: `La liste des posts n'a pas été trouvée.` });
            }
            res.status(200).json(postsFounds);
        })
        .catch(error => { // Si findAll sur Post échoue
            const message = `Le post n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        });
};

// Récuperer unn post
exports.findOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }})
        .then(postFound => { // Promesse retournée Si findOne sur Post se passe bien
            if(!postFound) { // Si post n'existe pas
                return res.status(404).json({ error: ` Le post n'a pas été trouvé. Essayez une autre URL.` });
            }
            res.status(200).json(postFound);
        })
        .catch(error => { // Si findAll sur Post échoue
            const message = `Le post n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        });
};

// Modifier un post
exports.updateOnePost = (req, res, next) => {
    if(req.file) { // Si l'image est modifiée
        Post.findOne({ where: { id: req.params.id }})
            .then(postFound => { // Promesse retournée Si findOne se passe bien
                if(!postFound) { // Si post n'existe 
                    return res.status(404).json({ error: `Le post n'a pas été trouvé. Essayer une autre URL.` });
                }
                const filename = postFound.imageUrl.split('/images') [1]; // On récupère le nom de l'image
                fs.unlink(`images/${filename}`, () => {
                    const postObject = // Création du nouveau objet post
                    {   
                        ...JSON.parse(req.body.post),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Post.update({ ...postObject }, { where : { id: req.params.id }})
                        .then(() => res.status(200).json({ message: `Le post est modifié avec succès !` }))
                        .catch(error => { // Si update sur Post échoue
                            const message = `Le post n'a pas pu être modifié. Réessayez dans quelques instants.`;
                            res.status(500).json({ message, error: error });
                        });
                });
            })
            .catch(error => { // Si findOne sur Post échoue
                const message = `Le post n'a pas pu être récupéré. Réessayez dans quelques instants.`;
                res.status(500).json({ message, error: error });
            });
    } else { // S'il n'y a pas de fichier image
        const postObject = { ...req.body }
        Post.update({ ...postObject }, { where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: `Le post est modifié avec succès !` }))
            .catch(error => { // Si update sur Post échoue
                const message = `Le post n'a pas pu être modifié. Réessayez dans quelques instants.`;
                res.status(500).json({ message, error: error });
            });
    }
};


// Suppression d'un post
exports.deleteOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }}) // On trouve l'objet dans la base de données //
        .then((post) => {
            Post.destroy({ where: { id: req.params.id } }) // Méthode //
                .then(() => res.status(200).json({ message: 'post supprimé avec succès' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récuperer tous les commentaires d'un post
exports.findCommentsOfPost = (req, res, next) => {
    Post.findAll({ 
        where: { id: req.params.id },
        include: [{
            model: Comment
        }]
    })
     .then(commentsFound => {
        if(!commentsFound) { // Si commentaires n'existent pas
            return res.status(404).json({ error: 'Commentaires non trouvés. Essayez une autre URL.' });
        }
        res.status(200).json(commentsFound);
     }) 
     .catch(error => { // Si findAll échoue
         const message = 'Commentaires non récupérés. Réessayez dans quelques instants.';
         res.status(500).json({ message, error: error });
     });   
};

// Récuperer tous les likes d'un post
exports.findLikesOfPost = (req, res, next) => {
    Post.findAll({ 
        where: { id: req.params.id },
        include: [{
            model: Like
        }]
    })
     .then(likesFound => {
        if(!likesFound) { // Si likes n'existent pas
            return res.status(404).json({ error: 'Likes non trouvés. Essayer une autre URL.' });
        }
        res.status(200).json(likesFound);
     })
     .catch(error => { // Si findAll échoue
        const message = 'Likes non récupérés. Réessayez dans quelques instants.';
        res.status(500).json({ message, error: error });
    }); 
};