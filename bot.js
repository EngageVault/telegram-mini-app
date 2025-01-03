const { Telegraf } = require('telegraf');

// Utilisation du token depuis les variables d'environnement
const bot = new Telegraf(process.env.BOT_TOKEN);

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

// Gestion des erreurs
bot.catch((err, ctx) => {
    console.error('Erreur du bot:', err);
});

bot.launch();