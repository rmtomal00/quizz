class Response {
    constructor() {
        
    }

    successResponse(res, message, data = "Not required"){
        return res.status(200).json({
            message,
            data,
            statusCode: 200,
            error: false,
        })
    }

    unsuccessResponse(res,message, code){
        return res.status(code).json({
            message,
            statusCode: code,
            error: true,
        })
    }

    serverErrorRes(res, message){
        return res.status(500).json({
            message,
            statusCode: 500,
            error: true,
        })
    }
}

module.exports = Response