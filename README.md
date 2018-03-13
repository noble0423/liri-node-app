# LIRI-node-app

## Objective

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Command Entry Syntax

1. Every command begins by entering the following: "node liri.js"

    * Following the above command parameters, hit the spacebar once and then enter one of the following four commands and follow further instructions:

        A. "my-tweets" - no further instructions on this command. Using the Twitter API, "my-tweets" will return the 20 most recent tweets based off of the Twitter username (currently set to noblebot5000) to the Terminal Screen as well as log.txt.

        B. "spotify-this-song" - following this command, press the spacebar and then type in any song title that you want to get more information about from the Spotify API (i.e. Artist, Album, URL for song preview, etc.). Information will be displayed in the Terminal Screen as well as log.txt.

        C. "movie-this" - following this command, press the spacebar and then type in any movie title that you want to get more information about from OMDB API (i.e. Director, Actors, Plot, etc.). Information will be displayed in the Terminal Screen as well as log.txt.

        D. "do-what-it-says" - no further instructions are needed. the "do-what-it-says" command reads the text located in random.txt file (containing one of the above commands and any further data) and runs back through LIRI in order to generate a response to the Terminal and log.txt.
    


    

