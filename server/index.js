import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import mongourl from './mongourl';
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //should be above routes

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

try {
  await mongoose.connect(mongourl).then(() => app.listen(5000))
    .then(() => console.log('Connected to database and Listen on localhost://5000'));
} catch (err) { console.error(err); }

