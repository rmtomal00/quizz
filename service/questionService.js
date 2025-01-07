const { raw } = require("mysql2")
const questionModel = require("../database/models/quizeQuestions")
const {Op} = require('sequelize')

class QuestionService{
    constructor(){}

    async createQuestion(question, optionArray, answer, exam, subject){
        try {
            if(!Array.isArray(optionArray) || optionArray.length != 4){
                throw new Error("Option should be an array and minimum 4 itams")
            }
    
            const create = await questionModel.create({
                question: question,
                exam: exam,
                options: optionArray,
                ans: answer,
                subject
            })
    
            if(create){
                return {
                    status: "Success",
                    uid: create.id
                }
            }else{
                throw new Error("Question not created");
            }
        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`)
            
        }

    }

    async updateQuestion(questionUID, update){
        try {
            const updated = await questionModel.update(update,{
                where:{
                    id: questionUID
                }
            });
    
            if (updated[0] > 0) {
                return {
                    status: "Update Success"
                }
            }else{
                throw new Error("Not modify anything");
            }
        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`)
            
        }
    }

    async getQuestionAsList(pageNumber){
        try {
            if (typeof(pageNumber) !== "number") {
                throw new Error("Page Number should be in number format")
            }
            pageNumber <= 0 ? 1 : pageNumber;
            const number = (pageNumber - 1) * 100;
            
            const totalQuestPage = Math.ceil( await questionModel.count() / 100);

            const listOfQuestIds = await questionModel.findAll({
                attributes: ['id'],
                limit: 100,
                offset: number,
                raw: true
            });
            const idList = listOfQuestIds.map((record) => record.id);
            const getQues = await questionModel.findAll({
                where: {
                    id: idList
                },
                raw: true
            });

            if (getQues.length <= 0) {
                throw new Error("No more questions");
            }
            return {
                totalQuestPage,
                questionList: getQues,
                page: pageNumber
            }
        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`)
        }
    }

    async findById(uid){
        try {
            if (!uid || typeof(uid) !== 'number') {
                throw new Error("Invalid UID");
            }
            const quizeData = await questionModel.findOne({
                where: {
                    id: uid
                },
                raw: true
            });
            if (!quizeData) {
                throw new Error("Question not found")
            }

            return quizeData;

        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`)
        }
    }

    async deteleQuestion(uid){
        try {
            if (!String(uid).trim() || !Number(uid)) {
                throw new Error("Invalid type of UID");
            }
            const data = await questionModel.findOne({
                where: {
                    id: uid
                },
                raw: true
            })
            if (!data) {
                throw new Error("Question not found");
            }
            const deleteQuestion = await questionModel.destroy({
                where:{
                    id: uid
                },
            });
            console.log(deleteQuestion);
            return {
                status: `Delete question ${uid}`
            }
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
            
        }
    }
}

module.exports = QuestionService