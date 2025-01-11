const express = require('express');
const CoreRoute = express.Router();

CoreRoute.get("/", (req, res)=>{
    res.render("homepage", {activePage : "home"});
});

CoreRoute.get("/privacy-policy", (req, res)=>{
    res.render('privacy', {
        activePage: 'privacy'
    })
})

CoreRoute.get("/contact", (req, res)=>{
    res.render('contact', {
        activePage: 'contact'
    })
})

CoreRoute.get('/quizz-manage', (req, res)=>{
    res.render('manage', {
        activePage: "quizz"
    })
})


module.exports = CoreRoute