import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import * as usersController from "./controllers/users";
import bodyParser from "body-parser";
import { config } from "./config";
import authMiddleware from "./middlewares/auth";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is working");
});

app.post("/api/users", usersController.register);
app.post("/api/users/login", usersController.login);
app.get("/api/user", authMiddleware, usersController.currentUser);

io.on("connection", () => {
  console.log("Socket connected!");
});

mongoose
  .connect(config.DB_URI)
  .then(() => {
    console.log("MongoDB Connected!");
    httpServer.listen(config.PORT, () => {
      console.log(`Server running on PORT: ${config.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
  });
