from telegram import Update, InlineKeyboardButton, WebAppInfo
from telegram.ext import CallbackContext

def start(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("⭐ Join our Community", url="https://t.me/engagevaultcommunity")],
        [InlineKeyboardButton("🚀 Launch App", url="https://google.com")],
        [InlineKeyboardButton("📱 Open WebApp", web_app=WebAppInfo("https://votre-domaine.com"))]
    ]
    # ... reste du code ... 