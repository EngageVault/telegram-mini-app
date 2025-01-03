from flask import Flask, request
from telegram import Bot, Update
from telegram.ext import CommandHandler, MessageHandler, Filters, Dispatcher
import os

app = Flask(__name__)

TOKEN = '7929001260:AAG_EZTbt3C11GCZauaLqkuP99YKkxB1NJg'
bot = Bot(token=TOKEN)

@app.route('/')
def index():
    return 'Bot is running!'

@app.route('/webhook', methods=['POST'])
def webhook():
    update = Update.de_json(request.get_json(), bot)
    dp.process_update(update)
    return 'ok'

def start(update, context):
    update.message.reply_text('Bonjour! Je suis votre bot hébergé sur Render!')

dp = Dispatcher(bot, None)
dp.add_handler(CommandHandler('start', start))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 