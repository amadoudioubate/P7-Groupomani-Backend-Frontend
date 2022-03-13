// importer les modules natifs et externes
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { User } = require('../models');
const validate = require('validator');
const passwordValidator = require('password-validator');

const maxAge = 3 * 24 * 60 * 60 * 1000;

var schema = new passwordValidator();

// Ajout des propriétés
schema
.is().min(8)                                    // Longueur minimum 8
.is().max(255)                                  // Longueur maximum 255
.has().uppercase(1)                             // Doit avoir au moins une littre majuscule
.has().lowercase()                              // Doit avoir des lettres minuscules
.has().digits(1)                                // Doit avoir au moins deux chiffres
.has().not().spaces()                           // Ne doit pas avoir d'espaces



// Inscription utilisateur
exports.signup = (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;

    // Si les champs email, password, prenom et nom sont vides
    if(validate.isEmpty(email) || validate.isEmpty(password) || validate.isEmpty(firstName) 
        || validate.isEmpty(lastName)) {
        return res.status(400).json('Champ obligatoire.');
    }

    // Si l'email n'est pas un e-mail valide
    if(!validate.isEmail(email)) {
        return res.status(400).json('Adresse mail non valide.');
    }

    // Si le mot de passe n'est pas compris entre 6 et 255 caractères
    if(!schema.validate(password)) {
        return res.status(400).json('Mot de passe invalide, il doit contenir entre 8 et 255 caractères.');
    }

    // Vérifier si l'email choisi existe déjà
    User.findOne({ where : { email: email}})
     .then(userFound => {
        if(userFound) return res.status(409).json('Email déjà pris.')
     });

    // Hachage du mot de passe
    bcrypt.hash(password, 10) 
     .then(hash => {
        // création du nouveau utilisateur
        User.create({ 
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            imageUrl: req.body.imageUrl,
            job: req.body.job
        })
         .then(user => res.status(201).json({ message: `Utilisateur ${user.firstName} ${user.lastName} est enrégistré.`}))
         .catch(error => { // Si create sur User échoue
            const message = `Utilisateur n'a pas pu être enrégistré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        });
     })
     .catch(error => {
        const message = `Hachage du mot de passe a échoué. Réessayez dans quelques instants.`;
        res.status(500).json({ message, error: error });
     });
};

// Connexion utilisateur
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    if(email===null || password === null) {
        return res.status(400).json({ error: `Champ obligatoire !` });
    }
    User.findOne({ where: { email: email}})
        .then(userFound => {
            if(!userFound) { // Si l'utilisateur n'existe pas
                return res.status(404).json({ error: `Email inconnu !` });
            }
            bcrypt.compare(password, userFound.password) // Comparaison des mots de passe
                .then(isValid => {
                    if(!isValid) { // Si les mots de passe ne correspondent pas
                        return res.status(401).json({ error: `Mot de passe invalide !` });
                    }
                    //Si les mots de passe correspondent on crée un token pour l'envoyer au frontend
                    const token = jwt.sign(
                        { 
                          userId: userFound.id, 
                          isAdmin: userFound.isAdmin 
                        },
                        process.env.JWT_TOKEN,
                        { expiresIn: maxAge }
                    );
                    //const token = createToken(userFound.id)
                    res.cookie('jwt', token, { httpOnly: true, maxAge });
                    res.status(200).json({
                       userId: userFound.id, 
                       isAdmin: userFound.isAdmin,
                       token: token
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => { // Si findOne sur User échoue
            const message = `Utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`;
            res.status(500).json({ message, error: error });
        });
};


// Déconnexion
exports.logout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}