// Data Resource: Hats
// RESTful routes:

// HTTP Method	Route	Action	Description
// GET	/hats	Index	Displays a list of all hats
// GET	/hats/new	New	Shows a form to create a new hat
// POST	/hats	Create	Creates a new hat
// GET	/hats/:id	Show	Displays a specific hat by its ID
// GET	/hats/:id/edit	Edit	Shows a form to edit an existing hat
// PUT	/hats/:id	Update	Updates a specific hat by its ID
// DELETE	/hats/:id	Destroy	Deletes a specific hat by its ID

//server.js

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



// const hatSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     description: {type: String, required: true},
//     image: String,
// });

// const hat = mongoose.model('hat', hatSchema)
// module.exports = hat

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// server.js

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Cap model
const Cap = require("./models/cap.js");




app.listen(3000, () => {
  console.log('Listening on port 3000');
});
