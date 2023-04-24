
import express from "express";
import cors from "cors";
import { dbConnection } from "../database/config.js";
import userRotes from "../routes/user.routes.js";
import authroutes from "../routes/auth.routes.js";

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
    this.app.use(this.usersPath, userRotes);
    this.app.use(this.authPath, authroutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on...", this.port);
    });
  }
}

export default Server;
