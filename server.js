const express = require("express");
const app = express();
const restaurantRouter = require('./routers/restaurant')
const {sequelize} = require('./db')

const port = 3000;

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use('/restaurants',restaurantRouter)


app.listen(port, () => {
    sequelize.sync();
    console.log(`your server is listening at HTTP://localhost:${port}`);
})