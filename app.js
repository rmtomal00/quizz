const express = require('express')
const app = express()
require('dotenv').config()
const quizeController = require('./controller/quizeController')
const path = re
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/v1", quizeController)
app.get('/', (req, res) => res.send('Hello World!'))

app.use((req, res, next) => {
    res.status(404).send("<h1> Page Not Found </h1>");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))