const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
require("dotenv").config();

const recipeModel = require("./api/recipe.model");
const recipeControllers = require("./api/recipe.controllers");

const app = express();

// const dataBaseURL = process.env.DATABASE || "mongodb://localhost:27017";
const dataBaseURL = "mongodb+srv://rossellinie:1q2w3e4r@cluster0.xuxvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const dataBaseURL = "mongodb://localhost:27017";
// const dataBaseURL = "mongodb+srv://daniel:dd2345@recipescluster.anocj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload())

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/recipes", recipeControllers.findAll);
app.get("/api/recipes/:id", recipeControllers.findById);
app.post("/api/recipes", recipeControllers.add);
app.put("/api/recipes/:id", recipeControllers.update);
app.delete("/api/recipes/:id", recipeControllers.delete);
app.get("/api/import", recipeControllers.import);
app.get("/api/killall", recipeControllers.killall);
app.post('/api/upload', recipeControllers.upload)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
