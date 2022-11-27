/*
 * SocketIo connection logic
 */

module.exports = (app) => {
  app.io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("ping", (id) => {
      app.io.emit("pong");
      console.log("pinged");
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
