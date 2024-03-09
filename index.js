const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 1000;

app.use(express.json());

// app.use(fileSharingRoutes);



app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));