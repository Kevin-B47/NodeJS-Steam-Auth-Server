# NodeJS Steam Auth Server

## What is this project
This NodeJS server will allow you to authorize and return information about a user through a few requests. It redirects them to sign into steam along with having Passport handle all of the heavy stuff. This is great for services that allow you to sign in through steam or if you have a steam user that should be able to access information that others cannot.

This project uses Express, Express Sessions for SQL and a few other dependencies.

## Routes
 - /auth/login (logs in)
 - /auth/get (gets user info based on sessionid. Steam Name, avatars, steam64,steamid)
 - /auth/logout (destroys session data)
 - / (index acts like /auth/get)
## .ENV & Configuration
If you have make a .env file at the root, you can override the config.js file. This is create for things like container support. I have included a dummy enviroment file with all of the current config options so you don't have to go searching for them.

## Docker
The dockerfile assumes you already have a SQL service somewhere
