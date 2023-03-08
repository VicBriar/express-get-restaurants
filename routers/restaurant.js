const express = require('express');
const router = express.Router();;
const {Restaurant} = require("../models/index");
const {sequelize} = require('../db');
const {body,check,validationResult} = require('express-validator');


router.get('/', async (request,response) =>{
    let restaurants = await Restaurant.findAll()
    response.json(restaurants)
})


router.get("/:id", async (request, response) => {
    let restaurant = await Restaurant.findByPk(request.params.id);
    response.json(restaurant)
})

router.post(
    '/',
    [
        check("name").not().isEmpty().trim().withMessage("name cannot be empty"),
        check("location").not().isEmpty().trim().withMessage("location cannot be empty"),
        check("cuisine").not().isEmpty().trim().withMessage("cuisine cannot be empty")
    ],
    async (request,response) => {
        const errors  = validationResult(request);
        if(errors.isEmpty()){
            try {
                let restaurant = request.body;
                await Restaurant.create(restaurant)
                let restaurants = await Restaurant.findAll()
                response.json(restaurants)
            }catch(err){
                console.log(err)
            }
        } else {
            response.status(400).json({errors: errors.array()})
            console.log("errors were found")
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