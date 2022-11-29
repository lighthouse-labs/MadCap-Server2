/*
 * SocketIo connection logic
 */

module.exports = (app) => {
  app.io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("ping", (id) => {
      app.io.emit("pong");
      console.log("pinged");
      console.log(socket.id)
    });
    socket.on('send-message', message => {
        app.io.in(message.room).emit('message', message);
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
    socket.on("set-room", (room) => {
      console.log(socket.id, "joined room", room)
      socket.join(room)
      console.log(socket.rooms)
    });
  });
};


