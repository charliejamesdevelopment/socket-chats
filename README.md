# socket-chats
A simple application utilising the open-source npm module Socket.io & Express to allow users to create their own chat rooms!

# Validation still yet to be implemented as well as error handling.

# Dependencies
This application was built on Node.js v8.1.0 and Express v4.15.2. 

You will also need a MongoDB database to run the socket app itself. 

Please scroll to installation for relevant instructions. Relevant dependancy versions can be found below:
```
body-parser: ~1.17.1,
connect-flash: "^0.1.1",
cookie-parser: "~1.4.3",
cookie-session: "^2.0.0-beta.2",
debug: "~2.6.3",
express: "~4.15.2",
hbs: "~4.0.1",
mongodb: "^2.2.29",
mongoose: "^4.11.0",
morgan: "~1.8.1",
nodemon: "^1.11.0",
serve-favicon: "~2.4.2",
socketio: "^1.0.0"
```

# License
Feel free to use this application for whatever you want to use it for. You have my permission to modify, edit, and redistribute this application however you must give me credit by linking my github on the site itself.

# Installation
To install and run on port 3000 locally:
```
$ cd path/to/your/desired/folder
$ git clone https://github.com/charliejamesdevelopment/socket-chats.git
```
Now navigate to your application folder that you cloned and head into the file called /routes/database.js and replace url with your preferred mongodb url.

You can also change the port in the bottom of the app.js file.
### Now run:
```
$ npm install && npm start
```
And you're setup!

# Thanks!
Thanks for checking out this repository, hope it helped in any way possible.
