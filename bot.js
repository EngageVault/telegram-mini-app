const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = process.env.PORT || 3000;

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

// Utilisation de webhooks au lieu du polling
bot.launch({
    webhook: {
        domain: 'https://telegram-mini-app-production-5463.up.railway.app',
        port: PORT
    }
}).then(() => {
    console.log('Bot démarré en mode webhook sur le port', PORT);
}).catch(err => {
    console.error('Erreur au démarrage:', err);
});

// Gestion propre de l'arrêt
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));