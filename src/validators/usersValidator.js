const validateCreateUser = (body) => {
    let hasErrors = false;
    let numOfErrors = 0;
    let errorMessage = '';

    if (!body.first_name) {
        fieldErrors = true;
        numOfErrors++;
        fieldErrorMessage = fieldErrorMessage + 'First Name, ';
    }
    if (!body.last_name) {
        fieldErrors = true;
        numOfErrors++;
        fieldErrorMessage = fieldErrorMessage + 'Last Name, ';
    }
    if (!body.username) {
        fieldErrors = true;
        numOfErrors++;
        fieldErrorMessage = fieldErrorMessage + 'Username';
    }

    if (!hasErrors) return [true, ''];

    errorMessage = `${errorMessage} ${numOfErrors > 1 ? 'are' : 'is'} Required...`;
    return [false, errorMessage];
}

module.exports = { validateCreateUser };