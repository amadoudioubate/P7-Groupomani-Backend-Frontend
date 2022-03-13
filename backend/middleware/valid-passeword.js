var passwordValidator = require('password-validator');

// Créer un schema
var schema = new passwordValidator();

// Ajout des propriétés
schema
.is().min(8)                                    // Longueur minimum 8
.is().max(255)                                  // Longueur maximum 255
.has().uppercase(1)                             // Doit avoir au moins une littre majuscule
.has().lowercase()                              // Doit avoir des lettres minuscules
.has().digits(2)                                // Doit avoir au moins deux chiffres
.has().not().spaces()                           // Ne doit pas avoir d'espaces

module.exports = { schema }