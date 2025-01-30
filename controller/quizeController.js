const express = require('express');
const Response = require('../response/response');
const QuestionService = require('../service/questionService');
const quizeController = express.Router();
const fs = require('fs');
const path = require('path')
require('dotenv').config()

const respose = new Response();
const quesService = new QuestionService()

const passwordAdmin = process.env.PASSWORD_END

quizeController.post("/post-quize", async (req,res) =>{
    try {

        const {password, question, options, ans, exam, subject} = req.body;
        
        if (!password || password !== passwordAdmin)  {
            return respose.unsuccessResponse(res, "Password not match", 401);
        }

        if (!question || !options || !Array.isArray(options) || !ans || !subject) {
            return respose.unsuccessResponse(res, "Question, Options(should be an array), Subject, Ans can't be null or empty", 400)
        }
        const insert = await quesService.createQuestion(String(question).trim(), options, ans, !exam ? null: exam, subject);
        return respose.successResponse(res, "Question add success", insert);
    } catch (error) {
        console.log(error.message);
        respose.serverErrorRes(res, error.message)
    }
});

quizeController.get("/get-quize-list/:page", async (req, res)=>{
    try {
        var {page} = req.params;
        page = Number(page)
        if (!String(page).trim() || typeof(page) !== 'number' || page <= 0) {
            return respose.unsuccessResponse(res, "Page should be number and 1 or more", 400);
        }

        const list = await quesService.getQuestionAsList(page)
        const q_num = (page - 1) * 100;
        const updateList = list.questionList.map((data, index) => ({
            ...data,              
            uid: data.id,
            id: index + 1 + q_num,
        }));
        
        respose.successResponse(res, "Successfull", updateList)        
    } catch (error) {
        console.log(error);
        respose.serverErrorRes(res, error.message)
    }
})

quizeController.post("/update-quize", async (req, res) =>{
    try {
        var {password, uid, data} = req.body;

        if (password !== passwordAdmin) {
            return respose.unsuccessResponse(res, "Invaid password", 401)
        }
        
        if (!String(uid).trim() || typeof(uid) !== 'number') {
            return respose.unsuccessResponse(res, "uid should be number", 400)
        }

        if(!(data && typeof data === 'object' && !Array.isArray(data))){
            return respose.unsuccessResponse(res, "data should be an Object", 400);
        }

        const findUidData = await quesService.findById(uid);
        const map = new Map(Object.entries(findUidData))
        const requestMap = new Map(Object.entries(data))
        const mapKey = map.keys();
        for(let key of mapKey){
            const getUpdateValue = requestMap.get(key);
            if(key === 'id'){
                continue;
            }
            if (key === "options") {
                if (getUpdateValue && !Array.isArray(getUpdateValue) && !(getUpdateValue.length == 4)) {
                    return respose.unsuccessResponse(res, "options should be an array and length will 4", 400)
                }
            }
            if(getUpdateValue){
                map.set(key, getUpdateValue)
            }
        }
        const updateRes = await quesService.updateQuestion(uid, Object.fromEntries(map));
        return respose.successResponse(res, "Successfully update", updateRes);
    } catch (error) {
        console.log(error);
        return respose.serverErrorRes(res, error.message)
    }
})

quizeController.delete("/delete-quizz", async (req, res)=>{
    try {
        const {password, uid} = req.body;
        if (password !== passwordAdmin) {
            return respose.unsuccessResponse(res, "Password not match", 401);
        }
        if (!String(uid).trim() || !Number(uid)) {
            return respose.unsuccessResponse(res, "uid can't be empty and not be null", 400);
        }

        const deleteData = await quesService.deteleQuestion(uid);

        return respose.successResponse(res, "Detele Successfully", deleteData);

    } catch (error) {
        console.log(error);
        respose.serverErrorRes(res, error.message)
    }
})

quizeController.get("/get-ques-by-id/:uid", async (req, res) => {
    try {
        const id = req.params.uid
        if (!id  || !Number(id)) {
            return respose.unsuccessResponse(res, "UID not valid", 400)
        }
        return respose.successResponse(res, "Successful", await quesService.findById(Number(id)))
    } catch (error) {
        console.log(error);
        return respose.serverErrorRes(res, error.message);
    }
})

quizeController.get("/get-html", (req, res) => {
    const getView = req.query.view
    var sendComponent;
    if (getView === "insert") {
        sendComponent = "components/insert"
    }else if (getView === "update"){
        sendComponent = "components/update"
    }else if(getView === "delete"){
        sendComponent = "components/delete"
    }
    res.render(sendComponent, {}, (err, html) => {
        if (err) {
            return res.status(500).json({ message: "Error rendering EJS", error: err.message });
        }
        res.send(html); // Send rendered HTML
    });
});

module.exports = quizeController