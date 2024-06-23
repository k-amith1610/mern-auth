export const errorHandler = (req, res) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}