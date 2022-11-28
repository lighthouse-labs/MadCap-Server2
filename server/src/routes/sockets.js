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
        app.io.emit('message', message);
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
