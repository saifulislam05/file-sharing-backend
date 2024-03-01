import express from "express";
import router from "./routes/fileSharing.js";
// import mongoose from "mongoose";

const app = express();
// app.use(express.);

app.use(router)

app.listen(10000,()=>console.log("server is running on port 10000"))
