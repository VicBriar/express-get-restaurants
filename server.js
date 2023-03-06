const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;


//TOFIX: Create your GET Request Route Below: 
app.get("/restaurants", async (request, response) => {
    let restaurants = await Restaurant.findAll();
    response.send(restaurants)
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})