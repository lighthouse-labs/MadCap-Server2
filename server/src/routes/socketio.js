/*
 * SocketIo server routes info
 */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
  res.sendFile('/home/ndk/lighthouse/MadCap/server/src/routes/temptestfile.html')
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
