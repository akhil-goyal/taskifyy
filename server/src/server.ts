import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT: number = 4001;
const dbString: string =
  "mongodb+srv://akhilgoyalwork:v8NscXcZWxKO2ouh@taskifyy.2auuizl.mongodb.net/?retryWrites=true&w=majority&appName=Taskifyy";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.send("API is working");
});

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
