const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.setAdmin = (req, res, next) => {
    User.findOne({ where : { email: 'admin@gmail.com' }})
     .then(userFound => {
        if(userFound) return res.status(409).json('Email déjà pris.')
     });
    
    bcrypt.hash('Mosaique2013', 10)
     .then(hash => {
        User.create({
            email: 'admin@gmail.com',
            password: hash,
            firstName: firstName,
            lastName: lastName,
            imageUrl: req.body.imageUrl,
            job: req.body.job,
            isAdmin: 1
        })
         .then(user => res.status(201).json({ message: `Administrateur ${user.email} est enrégistré.`}))
         .catch(error => {
            const message = `Administrateur non enrégistré.`;
            res.status(500).json({ message, error: error });
         });
     })
     .catch(error => {
        const message = `Hachage du mot de passe a échoué.`;
        res.status(500).json({ message, error: error });
     });
    
};