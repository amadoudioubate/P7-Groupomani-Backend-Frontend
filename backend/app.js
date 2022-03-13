// Importer les modules natifs et externes
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const db = require('./models');
const { checkUser, requireAuth } = require('./middleware/auth');

// Initialisation de l'application express 
const app = express();

/************************************************************************************/
/*                           CONNEXION A LA BASE DE DONNEES                         */
/************************************************************************************/
db.sequelize
	.authenticate()
	.then(() => console.log('Connexion à Mysql réussie !'))
	.catch((error) => console.log('Connexion à Mysql échouée !', error))
    

/************************************************************************************/
/*                           MIDDLEWARES                                            */
/************************************************************************************/

//CORS pour autoriser les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`); // On accéde à l'API depuis cette origine //
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'   // Liste requêtes autorisées //
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
});

app.use(helmet()); // Securise les headers
app.use(express.json()); // Interception de toutes les requêtes qui ont un Content-type: json
app.use(cookieParser()); //middleware for cookies

// Middleware qui charge les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));



// récuperation de jwt et userId de l'utilisateur connecté
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user+"")
});


// Enregistrer des routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


// Exporter app
module.exports = app;