const express = require("express");
const mongoose = require("mongoose");

const PORT: number = 4000;
const dbString: string =
  "mongodb+srv://akhilgoyalwork:v8NscXcZWxKO2ouh@taskifyy.2auuizl.mongodb.net/?retryWrites=true&w=majority&appName=Taskifyy";

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});

mongoose
  .connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err: Error) => {
    console.error(err);
  });
