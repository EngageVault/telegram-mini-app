from flask import Flask, request, jsonify
from telegram import Bot, Update
from telegram.ext import CommandHandler, MessageHandler, Filters, Dispatcher
import os
import logging

# Configurer le logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)

TOKEN = '7929001260:AAG_EZTbt3C11GCZauaLqkuP99YKkxB1NJg'
bot = Bot(token=TOKEN)

# Créer un dispatcher global
dp = Dispatcher(bot, None, use_context=True)

@app.route('/')
def index():
    return 'Bot is running!'

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        logger.info("Webhook reçu")
        data = request.get_json()
        logger.info(f"Données reçues: {data}")
        
        update = Update.de_json(data, bot)
        dp.process_update(update)
        
        return jsonify({'status': 'ok'})
    except Exception as e:
        logger.error(f"Erreur dans webhook: {str(e)}")
        return jsonify({'status': 'error', 'message': str(e)})

def start(update, context):
    try:
        logger.info("Commande /start reçue")
        update.message.reply_text('Bonjour! Je suis votre bot. 🤖')
        logger.info("Message envoyé avec succès")
    except Exception as e:
        logger.error(f"Erreur dans start: {str(e)}")

def echo(update, context):
    try:
        logger.info("Message reçu")
        update.message.reply_text(f"Vous avez dit: {update.message.text}")
    except Exception as e:
        logger.error(f"Erreur dans echo: {str(e)}")

# Ajouter les handlers
dp.add_handler(CommandHandler('start', start))
dp.add_handler(MessageHandler(Filters.text & ~Filters.command, echo))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 