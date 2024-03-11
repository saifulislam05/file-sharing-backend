const express = require("express");
const mongoose = require("mongoose");
const fileSharingRoutes =require("./routes/fileSharing")

const app = express();

const PORT = 10000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/file-sharing-app")
    .then(console.log(`Database Connected Successfully`))
    .catch((err)=>console.log(`Error connecting Mongo Database Error - ${err}`));

app.use("/api/files", fileSharingRoutes);



app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));