// Importer le module express-rate-limit pour gérer les tantatives de connexion
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 1 heure
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message: 'Plusieurs tantatives de connexion echouée. Votre compte est bloqué pour 10 minutes'
});

module.exports = { limiter };