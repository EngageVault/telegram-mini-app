const webAppUrl = 'https://web-app-xy4h.onrender.com';

bot.command('start', (ctx) => {
    ctx.reply('Bienvenue dans EngageVault !', {
        reply_markup: {
            keyboard: [[{
                text: '📊 Ouvrir EngageVault',
                web_app: { url: webAppUrl }
            }]],
            resize_keyboard: true
        }
    });
}); 