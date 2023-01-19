const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    //Connect to database
    this.connectDB();
    // midlewares
    this.middlewares();
    // my routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // read body
    this.app.use(express.json());
    // public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes"));
    this.app.use(this.authPath, require("../routes/auth.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on...", this.port);
    });
  }
}

module.exports = Server;
