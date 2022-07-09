const sendResponse = (res, message, data, status, success) => {
    const statusCode = status || success ? 200 : 400;
    const response = {
        success: success,
    }

    if (message) response.message = message;
    if (data) response.data = data;
    
    res.status(statusCode).send(response);
}

const sendSuccessResponse = (res, message, data, status) => {
    sendResponse(res, message, data, status, true);
}

const sendErrorResponse = (res, message, data, status) => {
    sendResponse(res, message, data, status, false);
}

module.exports = { sendSuccessResponse, sendErrorResponse };