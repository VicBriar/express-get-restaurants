const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const { Musician } = require("../../Database/musicians-bands/Models/Musician");

const port = 3000;

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.get("/restaurants/:id", async (request, response) => {
    let restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant)
})
app.post('/restaurants', async (request,response) => {
    try {
        let restaurant = request.body;
        await Musician.create(restaurant)
        response.send("Musician added!")
    }catch(err){
        console.log(err)
    }
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})