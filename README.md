# twit-fullstack
social media app, front-end and back-end with react, nodeJs, express, mongo, and authentication with bcrypt and jsonwebtoken

## demo 
https://twit-client.herokuapp.com/

## how to use

```bash
git clone https://github.com/Bijayb37/twit-fullStack
```
### client
```bash
cd client
npm install
npm start
```
### server
```bash
cd server
npm install
//node or nodemon
nodemon index.js
node index.js
```
In server make sure to modify .env file and add your own SECRET_KEY, PORT and MONGOURI
```bash
SECRET_KEY="WHATEVER"
PORT=8080
MONGOURI="YOUR OWN MONGO URI LOCAL OR ATLAS"
```
