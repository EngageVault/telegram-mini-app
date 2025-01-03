const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = process.env.PORT || 3000;

// Configuration Express pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuration du bot
bot.command('start', (ctx) => {
    ctx.reply('Bonjour! Je suis votre bot Telegram.');
});

bot.command('webapp', (ctx) => {
    ctx.reply('Accédez à notre webapp :', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Ouvrir WebApp', web_app: { url: 'https://telegram-mini-app-production-5463.up.railway.app' } }
            ]]
        }
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

// Démarrage du bot
bot.launch().catch(err => {
    console.error('Erreur au démarrage du bot:', err);
});

// Gestion propre de l'arrêt
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));