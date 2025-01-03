const webAppUrl = 'https://engagevault.github.io/web-app/';

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