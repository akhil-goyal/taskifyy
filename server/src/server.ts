import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import * as usersController from "./controllers/users"; // Importing all exports
import bodyParser from "body-parser";

const PORT: number = 4001;
const dbString: string =
  "mongodb+srv://akhilgoyalwork:v8NscXcZWxKO2ouh@taskifyy.2auuizl.mongodb.net/?retryWrites=true&w=majority&appName=Taskifyy";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is working");
});

app.post("/api/users", usersController.register);

io.on("connection", () => {
  console.log("Socket connected!");
});

mongoose
  .connect(dbString)
  .then(() => {
    console.log("MongoDB Connected!");
    httpServer.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error(err);
  });
