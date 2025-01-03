const { Telegraf } = require('telegraf');
const bot = new Telegraf('VOTRE_TOKEN_BOT');

// Gestionnaire de commande /start
bot.command('start', (ctx) => {
    ctx.reply('Bonjour! Je suis votre bot Telegram.');
});

// Gestionnaire de messages
bot.on('text', (ctx) => {
    ctx.reply('Message reçu : ' + ctx.message.text);
});

bot.launch();