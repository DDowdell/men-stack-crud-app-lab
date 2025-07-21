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

//Middleware===========================================================
app.use(express.urlencoded({ extended: false }));



//Routes below=========================================================

//GET Home route
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET New route
app.get("/caps/new", (req, res) => {
  res.render("caps/new.ejs"); 
});

//POST Create route
app.post("/caps", async (req, res) => {
  if (req.body.isReadyToWear === "on") {
    req.body.isReadyToWear = true;
  } else {
    req.body.isReadyToWear = false;
  }
  await Cap.create(req.body);
  res.redirect("/caps");
});

//GET caps index
app.get("/caps", async (req, res) => {
  const allCaps = await Cap.find();
  res.render("caps/index.ejs", { caps: allCaps });
});


//Routes above=============================================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});