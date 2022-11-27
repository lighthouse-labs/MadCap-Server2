/*
 * SocketIo connection logic
 */
const http = require("http")
const io = require("socket.io")

module.exports = (app) => {
  app.io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("ping", (id) => {
      app.io.emit("pong");
      console.log("pinged");
    });
    socket.on("disconnect", () => {
      console.log("bye");
    });
    // app.set("socket", socket);
  });
};
