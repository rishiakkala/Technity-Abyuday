import os
import telebot
import requests
import json
import csv

# Get your environment variables (BOT_TOKEN and OMDB_API_KEY)
bot_token = '6499603328:AAFIqLsPF0-OtdPXonOmfr0-TFWu-chk4Ik'
omdb_api_key = '5a3615fa'

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
        message, 'Hello there! I am a bot that helps you manage your Movie Watchlist.\n\n')

@bot.message_handler(commands=['stop', 'bye'])
def goodbye(message):
    global botRunning
    botRunning = False
    bot.reply_to(message, 'Goodbye!\nHappy movie watching!')

# Help command
@bot.message_handler(func=lambda message: botRunning, commands=['help'])
def helpProvider(message):
    bot.reply_to(message, '1.0 You can use \"/add MOVIE_TITLE\" command to add a movie to your watchlist. For example, \"/add Inception\"\n\n2.0. You can use \"/list\" command to view your current watchlist.\n\n3.0. You can use \"/stop\" or the command \"/bye\" to stop the bot.')

# Add movie command
@bot.message_handler(func=lambda message: botRunning, commands=['add'])
def addMovie(message):
    bot.reply_to(message, 'Adding a movie to your watchlist...')
    
    # Extract movie title from the command
    movie_title = message.text.split()[1:]
    
    if not movie_title:
        bot.reply_to(message, 'Please provide the movie title in the format: /add <movie_title>')
        return
    
    movie_title = ' '.join(movie_title)
    
    # Fetch movie details from OMDB API
    omdb_url = f'http://www.omdbapi.com/?t={movie_title}&apikey={omdb_api_key}'
    response = requests.get(omdb_url)
    
    if response.status_code == 200:
        movie_data = json.loads(response.text)
        
        if movie_data.get('Response') == 'True':
            title = movie_data.get('Title')
            year = movie_data.get('Year')
            rating = movie_data.get('imdbRating')
            
            # Add the movie to the watchlist
            movie_watchlist.append({'title': title, 'year': year, 'rating': rating})
            bot.reply_to(message, f"Added\n Movie Name : '{title}'\n Release Year : ({year})\n with IMDb Rating: {rating} to your watchlist.")
        else:
            bot.reply_to(message, 'Movie not found in OMDB.')
    else:
        bot.reply_to(message, 'Error fetching movie details from OMDB.')

# List watchlist command
@bot.message_handler(func=lambda message: botRunning, commands=['list'])
def listWatchlist(message):
    bot.reply_to(message, 'Listing your watchlist...')
    
    if not movie_watchlist:
        bot.reply_to(message, 'Your watchlist is empty.')
    else:
        watchlist_text = ''
        for movie in movie_watchlist:
            watchlist_text += f"Movie Name : {movie['title']}\nRelease Year : {movie['year']}\nIMDb Rating : {movie['rating']}\n\n\n"
        bot.reply_to(message, watchlist_text)

# Default message handler
@bot.message_handler(func=lambda message: botRunning)
def default(message):
    bot.reply_to(message, 'I\'m here to help you manage your Movie Watchlist! Just send me a command.')

# Start the bot
bot.infinity_polling()

