# socket-chats
A simple application utilising the open-source npm module Socket.io & Express to allow users to create their own chat rooms!

# READ!
This application was built on Node.js v8.1.0 and Express v4.15.2. Relevant dependancy versions can be found below:
```json
"dependencies": {
  "body-parser": "~1.17.1",
  "connect-flash": "^0.1.1",
  "cookie-parser": "~1.4.3",
  "cookie-session": "^2.0.0-beta.2",
  "debug": "~2.6.3",
  "express": "~4.15.2",
  "hbs": "~4.0.1",
  "mongodb": "^2.2.29",
  "mongoose": "^4.11.0",
  "morgan": "~1.8.1",
  "nodemon": "^1.11.0",
  "serve-favicon": "~2.4.2",
  "socketio": "^1.0.0"
}
```

# License
Feel free to use this application for whatever you want to use it for. You have my permission to modify, edit, and redistribute this application however you must give me credit by linking my github on the site itself.

# Installation
To install and run on port 3000 locally:
```
$ cd path/to/your/desired/folder
$ git clone https://github.com/charliejamesdevelopment/socket-chats.git
$ npm install && npm start
```
Now navigate to your application folder that you cloned and head into the file called /routes/database.js and replace url with your preferred mongodb url.

