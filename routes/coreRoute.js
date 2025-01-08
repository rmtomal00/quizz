const express = require('express');
const CoreRoute = express.Router();

CoreRoute.get("/", (req, res)=>{
    res.render("homepage", {activePage : "home"});
});

const array = [1, [1,1], [1,3,[1,4]], 3];

var maxV = 0
function max(array){
    for(let x of array){
        if (Array.isArray(x)) {
            max(x)
        }else if (x > maxV) {
            maxV = x
        }
    }
}
max(array)
console.log(maxV);

module.exports = CoreRoute