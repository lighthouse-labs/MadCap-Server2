/*
 * SocketIo server routes info
 */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const socket = req.app.get("socket");
  socket.emit("ping")
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});



module.exports = router;
