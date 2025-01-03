const express = require('express');
const path = require('path');
const app = express();

// Middleware pour les logs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route par défaut
app.get('*', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Current directory: ${__dirname}`);
    console.log(`Files in directory:`, require('fs').readdirSync(__dirname));
}); 