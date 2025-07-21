// 

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express();

//connection logic=====================================================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Cap = require("./models/cap.js");

//Middleware===========================================================
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));


//Routes below=========================================================

//GET Home route
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET Add/New route
app.get("/caps/new", (req, res) => {
  res.render("caps/new.ejs"); 
});

//GET AllCaps ID route
app.get("/caps/:capId", async (req, res) => {
  const foundCap = await Cap.findById(req.params.capId);
  res.render("caps/show.ejs", { cap: foundCap });
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

//GET index route
app.get("/caps", async (req, res) => {
  const allCaps = await Cap.find();
  res.render("caps/index.ejs", { caps: allCaps });
});

//DELETE button route
app.delete("/caps/:capId", async (req, res) => {
  await Cap.findByIdAndDelete(req.params.capId);
  res.redirect("/caps");
});

//GET edit route
app.get("/caps/:capId/edit", async (req, res) => {
  const foundCap = await Cap.findById(req.params.capId);
  res.render("caps/edit.ejs", {
    cap: foundCap,
  });
});

//PUT update route
app.put("/caps/:capId", async (req, res) => {
  if (req.body.isReadyToWear === "on") {
    req.body.isReadyToWear = true;
  } else {
    req.body.isReadyToWear = false;
  }
  await Cap.findByIdAndUpdate(req.params.capId, req.body);
  res.redirect(`/caps/${req.params.capId}`);
});




//Routes above=============================================
app.listen(3000, () => {
  console.log('Listening on port 3000');
});