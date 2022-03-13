// importer les modules natifs et externes
const validate = require('validator');
const { Comment } = require('../models');


// Créer un commentaire
exports.createComment = (req, res, next) => {
    // Si le champ content est vide
    if(validate.isEmpty(req.body.content)) return res.status(400).json('Champ obligatoire')
    
    // Créer commentaire
    Comment.create({
        content: req.body.content,
        UserId: req.body.UserId,
        PostId: req.body.PostId
    })
     .then(() => res.status(201).json({ message: `Le commentaire est crée avec succès !` }))
     .catch(error =>  { // Si create échoue
        const message = `Le commentaire n'a pas pu être crée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, error: error });
     });
};

// Récuperer tous les commentaires
exports.findAllComments = (req, res, next) => {
    Comment.findAll()
        .then(commentsFound => {
            if(!commentsFound) { // Si commentaires n'existent pas
                return res.status(404).json({ error: `La liste des commentaires non trouvée. Essayez une autre URL.` });
            }
            res.status(200).json(commentsFound);
        })
        .catch(error =>  { // Si findAll échoue
            const message = `Les commentaires n'ont pas pu être récupérés. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        });
};

// Récuperer un commentaire
exports.findOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id}})
        .then(commentFound => {
            if(!commentFound) { // Si commentaire n'existe pas
                return res.status(404).json({ error: `Le commentaire non trouvé. Essayez une autre URL.` });
            }
            res.status(200).json(commentFound);
        })
        .catch(error =>  { // Si findOne échoue
            const message = `Le commentaire n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        });
};

// Mettre à jour un commentaire
exports.updateOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id }})
        .then(commentFound => {
            if(!commentFound) { // Si commentaire n'existe pas
                return res.status(404).json({ error: `Le commentaire non trouvé. Essayer une autre URL.` });
            }
            const commentObject = { ...req.body };
            Comment.update({ ...commentObject }, { where : { id: req.params.id }})
                .then(() => res.status(200).json({ message: `Le commentaire est modifié avec succès !` }))
                .catch(error =>  { // Si create échoue
                     const message = `Le commentaire n'a pas pu être modifié. Réessayez dans quelques instants.`;
                     res.status(500).json({ message, error: error });
                });
        })
        .catch(error =>  { // Si findOne échoue
            const message = `Le commentaire n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        }); 
};

// Supprimer un commentaire
exports.deleteOneComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id }})
        .then(commentFound => {
            if(!commentFound) { // Si commentaire n'existe pas
                return res.status(404).json({ error: `Le commentaire non trouvé. Essayer une autre URL.` });
            }
            Comment.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: `Le commentaire est supprimé avec succès !` }))
            .catch(error =>  { // Si create échoue
                const message = `Le commentaire n'a pas pu être supprimé. Réessayez dans quelques instants.`;
                res.status(500).json({ message, error: error });
            });
        })
        .catch(error =>  { // Si findOne échoue
            const message = `Le commentaire n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        }); 
};