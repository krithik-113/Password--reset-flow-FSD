const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const DB_URL = process.env.DB_CONNECTION_STRING;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/index"));

Mongoose_Conect_DB().catch((err) => console.log(err));
async function Mongoose_Conect_DB() {
  try {
    await mongoose.connect(
      "mongodb+srv://krithik-0113:AtN8nXqG9yoxoWom@cluster0.y8z4nih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log(err);
  }
}

app.listen(3500, () => {
  console.log("Server is running in port 3500");
});
