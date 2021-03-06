
// util funtion
const isValid = (err) => {
    return Object.keys(err).length < 1
}
// register
export const validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
 ) => {
    const errorInfo = {}
    if(username.trim() === '') {
        errorInfo.username = "Username must not be empty"
    }
    if(email.trim() === '') {
        errorInfo.email = "email must not be empty"
    } else {
        const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        const isValidate = re.test(email)
        !isValidate && (errorInfo.email = 'Email must be a valid email address')
    }
    if(password.trim() === '') {
        errorInfo.password = "Password must not be empty"
    } else if(password !== confirmPassword) {
        errorInfo.confirmPassword = "Password must match to confirm"
    }
    return {
        errorInfo,
        valid: isValid(errorInfo)
    }
}

// login
export const validateLoginInput = (username, password) => {
    const errorInfo = {}
    if(username.trim() === '') {
        errorInfo.username = 'Username must not be empty'
    }
    if(password.trim() === '') {
        errorInfo.password = 'Password must not be empty'
    }
    return {
        errorInfo,
        valid: isValid(errorInfo)
    }
}