const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = process.env.PORT || 8080;
const DOMAIN = 'https://telegram-mini-app-production-5463.up.railway.app';

// Middleware pour logger les requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Configuration Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route pour la webapp avec log
app.get('/', (req, res) => {
    console.log('Page principale demandée');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route webhook avec log
app.post('/webhook', (req, res) => {
    console.log('Webhook reçu:', req.body);
    bot.handleUpdate(req.body, res);
});

// Commandes bot avec logs
bot.command('start', (ctx) => {
    console.log('Commande start reçue');
    ctx.reply('Bonjour! Je suis votre bot Telegram.');
});

bot.command('webapp', (ctx) => {
    console.log('Commande webapp reçue');
    ctx.reply('Accédez à notre webapp :', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Ouvrir WebApp', web_app: { url: DOMAIN } }
            ]]
        }
    });
});

bot.on('web_app_data', (ctx) => {
    console.log('Données webapp reçues:', ctx.webAppData);
    ctx.reply('Données reçues : ' + ctx.webAppData.data);
});

// Fonction de démarrage améliorée
async function startServer() {
    try {
        console.log('Démarrage du serveur...');
        
        // Suppression de l'ancien webhook
        console.log('Suppression de l\'ancien webhook...');
        await bot.telegram.deleteWebhook();
        
        // Configuration du nouveau webhook
        console.log('Configuration du nouveau webhook...');
        await bot.telegram.setWebhook(`${DOMAIN}/webhook`);
        
        // Vérification du webhook
        const webhookInfo = await bot.telegram.getWebhookInfo();
        console.log('Info webhook:', webhookInfo);
        
        // Démarrage du serveur
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur ${DOMAIN}`);
            console.log(`Port d'écoute: ${PORT}`);
        });
    } catch (error) {
        console.error('Erreur au démarrage:', error);
    }
}

startServer();

// Gestion des erreurs globales
bot.catch((err, ctx) => {
    console.error('Erreur bot:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Erreur non gérée:', err);
});