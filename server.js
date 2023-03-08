const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const { Musician } = require("../../Database/musicians-bands/Models/Musician");

const port = 3000;

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.get("/restaurants", async (request,response) =>{
    let restaurants = await Restaurant.findAll()
    response.json(restaurants)
})


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
    console.log(`your server is listening at HTTP://localhost:${port}`);
})