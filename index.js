const express = require("express");
const mongoose = require("mongoose");
 require('dotenv').config()
const fileSharingRoutes =require("./routes/fileSharing")

const app = express();

const PORT = 10000;

app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  
  .then(console.log(`Database Connected Successfully`))
  .catch((err) =>
    console.log(`Error connecting Mongo Database Error - ${err}`)
  );

app.use(fileSharingRoutes);



app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));