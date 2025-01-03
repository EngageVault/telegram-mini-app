bot.command('webapp', (ctx) => {
    ctx.reply('Accédez à notre webapp :', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Ouvrir WebApp', web_app: { url: 'https://telegram-mini-app-production-5463.up.railway.app' } }
            ]]
        }
    });
}); 