// Importer le module jsonwebtoken pour créer et générer le token
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodeToken = jwt.verify(token, process.env.JWT_TOKEN);
//         const userId = decodeToken.userId;
//         const isAdmin = decodeToken.isAdmin;
//         console.log(isAdmin);
//         // Création d'un objet auth
//         req.auth = { 
//             userId: userId,
//             isAdmin: isAdmin 
//         };
//         console.log(req.auth);
//         if(req.body.userId && req.body.userId !== userId && isAdmin !== true) {
//             throw 'Identifiant utilisateur invalide !'
//         } else {
//             res.locals.userId;
//             res.locals.isAdmin;
//             next();
//         }
//     }
//     catch {
//         res.status(401).json({
//             error: new Error('Requête invalide !')
//         });
//     }
    
// };


module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          // res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          let user = await User.findByPk(decodedToken.userId);
          //console.log(user)
          res.locals.user = decodedToken.userId ;
          console.log(res.locals.user);
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
};


module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json('no token')
        } else {
          //console.log(decodedToken.userId);
          next();
        }
      });
    } else {
      console.log('No token');
    }
};