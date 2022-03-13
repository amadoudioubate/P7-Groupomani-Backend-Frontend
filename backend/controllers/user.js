// importer les modules natifs et externes
const fs = require('fs');
const { User } = require('../models');


// Créer un schema

// Récupérer tous les utilsateurs
exports.findAllUsers = (req, res, next) => {
    User.findAll({ attributes: { exclude: ['password'] }})
        .then(usersFounds => { 
            if(!usersFounds) { // Si les utilisateurs n'existent pas
                return res.status(404).json({ error: `La liste des utlisateurs non trouvée.` });
            }
            res.status(200).json(usersFounds);
        })    
        .catch(error => { // Si findAll sur User échoue
            const message = `La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error : error})
        });
};

// Récupérer un utlisateur
exports.findOneUser = (req, res, next) => {
    User.findOne({ 
            attributes: { exclude: ['password'] },
            where: {id: req.params.id }
        })
        .then(userFound => { 
            if(!userFound) { // Si l'utilisateur n'existe pas
                return res.status(404).json({ error: `Le profil utlisateur non trouvé. Essayez une autre URL.` });
            }
            res.status(200).json(userFound)
        })
        .catch(error => { // Si findOne sur User échoue
            const message = `Le profil utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error : error});
        });
};

// Modifier un utilisateur
exports.updateOneUser = (req, res, next) => {
    if(req.file) { // Si l'image a été modifiée, on supprime l'ancienne image dans le dossier images
        User.findOne({ where: { id: req.params.id }})
            .then(userFound => { // Promesse retournée Si findOne sur User n'échoue pas
                if(!userFound) { // Si l'utilisateur n'existe pas
                    return res.status(404).json({ error: `Le profil utilisateur non trouvé. Essayez une autre URL.` });
                }
                const filename = userFound.body.imageUrl.split('/images') [1];
                fs.unlink(`images/${filename}`, () => {
                    const userObject = {
                        ...JSON.parse(req.body.userFound),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    User.update({ ...userObject }, { where : { id: req.params.id }})
                        .then(() => res.status(200).json({ message: `Le profil utilisateur modifié avec succès.` }))
                        .catch(error => { // Si update sur User échoue
                            const message = `Le profil utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`; 
                            res.status(500).json({ message, error: error});
                        });
                });
            })
            .catch(error => { // Si findOne sur User échoue
                const message = `Le profil utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
                res.status(500).json({ message, error : error})
            });
    } else { // Si l'image n'a pas été modifié
        const userObject = { ...req.body }
        User.update({ ...userObject }, {where: {id: req.params.id }})
            .then(() => res.status(200).json({ message: `Le profil utilisateur mis à jour !` }))
            .catch(error => { // Si update sur User échoue
                const message = `Le profil utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`; 
                res.status(500).json({ message, error: error});
            });
    }
};

// Supprimer un utilisateur
exports.deleteOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})
    .then(userFound => {
        if(!userFound) {
            return res.status(404).json({ error: `Le profil utilisateur non trouvé. Essayez une autre URL.`});
        }
        if(req.file) {
            const filename = userFound.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                User.destroy({ where: { id: req.params.id }})
                    .then(() => res.status(200).json({ message: `Le profil utilisateur supprimé avec succès !` }))
                    .catch(error => {
                        const message = `Le profil utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`;
                        res.status(500).json({ message, error});
                    });
            })
        } else {
            User.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: `Le profil utilisateur supprimé avec succès !`}))
            .catch(error => {
                const message = `Le profil utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants !.`;
                res.status(500).json({ message, error});
            });
        }  
    })
    .catch(error => {
        const message = `Utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
        res.status(500).json({ message, error});
    });      
};






