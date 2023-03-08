const express = require('express');
const router = express.Router();;
const {Restaurant} = require("../models/index");
const {sequelize} = require('../db');


router.get('/', async (request,response) =>{
    let restaurants = await Restaurant.findAll()
    response.json(restaurants)
})


router.get("/:id", async (request, response) => {
    let restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant)
})

router.post('/', async (request,response) => {
    try {
        let restaurant = request.body;
        await Restaurant.create(restaurant)
        response.send("restaurant added!")
    }catch(err){
        console.log(err)
    }
})

router.put('/:id', async (request,response) => {
    try{
        let id = request.params.id
        let newRestaurant = request.body
        let restaurant = await Restaurant.findByPk(id)
        if(restaurant){
            restaurant.update(newRestaurant)
            response.status(200).send("restaurant updated")
            console.log("restaurant updated")
        } else {
            console.log("restaurant not found");
        }   
    }catch (err) {
        console.log(err)
    }
})

router.delete('/:id', async (request,response) =>{
    try{
        let id = request.params.id;
        let restaurant = await Restaurant.findByPk(id);
        if(restaurant){
            await restaurant.destroy()
            response.status(200).send("restaurant destroyed")
            console.log("restaurant destroyed")
        }else{
            response.status(500).send("restaurant not found")
            console.log("restaurant not found")
        }
    }catch (err) {
        console.error(err);
    }
})

module.exports = router;