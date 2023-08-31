import os
import telebot

# Get your environment variables
bot_token = '6499603328:AAFIqLsPF0-OtdPXonOmfr0-TFWu-chk4Ik'

bot = telebot.TeleBot(bot_token)

# Initialize the Movie Watchlist
movie_watchlist = []

botRunning = False

# Greeting and goodbye commands
@bot.message_handler(commands=['start', 'hello'])
def greet(message):
    global botRunning
    botRunning = True
    bot.reply_to(
        message, 'Hello there! I am a bot that helps you manage your Movie Watchlist.\nYou can control by sending this Command /help.\nTo see your watchlist use command /list.\n\n')

@bot.message_handler(commands=['stop', 'bye'])
def goodbye(message):
    global botRunning
    botRunning = False
    bot.reply_to(message, 'Goodbye!\nHappy movie watching!')

# Help command
@bot.message_handler(func=lambda message: botRunning, commands=['help'])
def helpProvider(message):
    bot.reply_to(message, '1.0 You can use \"/add MOVIE_TITLE YEAR RATING\" command to add a movie to your watchlist. For example, \"/add Iron Man 2008 7.8\"\n\n2.0. You can use \"/list\" command to view your current watchlist.\n\n3.0. You can use \"/stop\" or the command \"/bye\" to stop the bot.')

# Add movie command
@bot.message_handler(func=lambda message: botRunning, commands=['add'])
def addMovie(message):
    bot.reply_to(message, 'Adding a movie to your watchlist...')
    
    # Extract arguments from the command
    args = message.text.split()[1:]
    
    if len(args) < 3:
        bot.reply_to(message, 'Please provide the movie title, year of release, and IMDb rating in the format: /add <movie_title> <year> <rating>')
        return
    
    movie_title = args[0]
    year = args[1]
    rating = args[2]
    
    # Add the movie to the watchlist
    movie_watchlist.append({'title': movie_title, 'year': year, 'rating': rating})
    bot.reply_to(message, f"Added '{movie_title}' ({year}) with IMDb Rating: {rating} to your watchlist.")

# List watchlist command
@bot.message_handler(func=lambda message: botRunning, commands=['list'])
def listWatchlist(message):
    bot.reply_to(message, 'Listing your watchlist...')
    # TODO: 2.1 Generate a list of movies in the watchlist
    # TODO: 2.2 Show the watchlist in the chat window

# Default message handler
@bot.message_handler(func=lambda message: botRunning)
def default(message):
    bot.reply_to(message, 'I\'m here to help you manage your Movie Watchlist! Just send me a command.')

# Start the bot
bot.infinity_polling()
