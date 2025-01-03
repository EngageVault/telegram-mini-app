from flask import Flask, request, jsonify
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
    try:
        update = Update.de_json(request.get_json(), bot)
        print("Received update:", request.get_json())  # Log pour debug
        dp.process_update(update)
        return jsonify({'status': 'ok'})
    except Exception as e:
        print("Error:", str(e))  # Log pour debug
        return jsonify({'status': 'error', 'message': str(e)})

def start(update, context):
    try:
        message = "Bonjour! Je suis votre bot hébergé sur Render! 👋"
        update.message.reply_text(message)
        print("Start command processed")  # Log pour debug
    except Exception as e:
        print("Error in start:", str(e))  # Log pour debug

dp = Dispatcher(bot, None)
dp.add_handler(CommandHandler('start', start))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 