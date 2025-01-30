const express = require('express')
const app = express()
require('dotenv').config()
const quizeController = require('./controller/quizeController')
const coreRoute = require("./routes/coreRoute")
const path = require('path')
const port = process.env.PORT || 3000;
const cors  = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use("/api/v1", quizeController)
app.use(coreRoute);

app.use((req, res, next) => {
    res.render('pagenotfound');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))