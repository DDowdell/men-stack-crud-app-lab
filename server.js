// 

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();

//connection logic=====================================================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Cap = require("./models/cap.js");



//Routes below===============================================

//GET Home route
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET New route
app.get("/caps/new", (req, res) => {
  res.render("caps/new.ejs"); 
});



//Routes above=============================================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});