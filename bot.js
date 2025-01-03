const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = process.env.PORT || 8080;
const DOMAIN = 'https://telegram-mini-app-production-5463.up.railway.app';

// Configuration Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route pour la webapp
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour les webhooks Telegram
app.use(bot.webhookCallback('/webhook'));

// Configuration du bot
bot.command('start', (ctx) => {
    ctx.reply('Bonjour! Je suis votre bot Telegram.');
});

bot.command('webapp', (ctx) => {
    ctx.reply('Accédez à notre webapp :', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Ouvrir WebApp', web_app: { url: DOMAIN } }
            ]]
        }
    });
});

// Ajout de la gestion des données WebApp
bot.on('web_app_data', (ctx) => {
    console.log('Données reçues de la webapp:', ctx.webAppData);
    ctx.reply('Données reçues : ' + ctx.webAppData.data);
});

// Ajout de logs de diagnostic
async function checkWebhook() {
    try {
        const webhookInfo = await bot.telegram.getWebhookInfo();
        console.log('Webhook Info:', webhookInfo);
    } catch (error) {
        console.error('Erreur webhook:', error);
    }
}

// Démarrage du serveur et configuration des webhooks
async function startServer() {
    try {
        await checkWebhook(); // Ajout du diagnostic
        await bot.telegram.deleteWebhook();
        await bot.telegram.setWebhook(`${DOMAIN}/webhook`);
        await checkWebhook(); // Vérification après configuration
        
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur ${DOMAIN}`);
        });
    } catch (error) {
        console.error('Erreur au démarrage:', error);
    }
}

startServer();

// Gestion propre de l'arrêt
process.once('SIGINT', () => {
    bot.telegram.deleteWebhook();
    process.exit(0);
});

process.once('SIGTERM', () => {
    bot.telegram.deleteWebhook();
    process.exit(0);
});