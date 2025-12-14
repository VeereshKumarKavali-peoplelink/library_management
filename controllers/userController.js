const dbQueries = require("../dbQueries");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { success, failure } = require("../utils/response");
const errors = require("../utils/error.js");


// Register a new user
const signUpAPI = async (request, response) => {
    const {name, email, password} = request.body;
    try {
        const existingUser = await dbQueries.findOne(process.env.libraryUserTable, { email: email });
        if (existingUser) {
            return failure("BAD_REQUEST", { status: false, error: errors.USR_EXISTS_WITH_EMAIL }, response);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const finalItem = {
                    name,
                    email,
                    password: hashedPassword,
                }

        const result = await dbQueries.create(
                    process.env.libraryUserTable,
                    finalItem
                );

        return success({ status: true, data: result }, response);
    } catch (err) {
        console.log("Error in signup API+++", err);
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};


// Login a user
const loginAPI = async (request, response) => {
    const { email, password } = request.body;
    try {
        const user = await dbQueries.findOne(process.env.libraryUserTable, { email: email });
        if (user) {
            const isPasswordMatched  = await bcrypt.compare(password, user.password);
            if (isPasswordMatched ) {
                const jwtToken = jwt.sign({id: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const userData = { ...user._doc };
                delete userData.password;
                return success({ status: true, data: { ...userData, jwtToken } }, response);
            }else{
                return failure("BAD_REQUEST", { status: false, error: errors.INCRCT_PASSWRD }, response);
            }
        }else{
            return failure("BAD_REQUEST", { status: false, error: errors.USR_DOES_NOT_EXIST_WITH_EMAIL }, response);
        }
    } catch (err) {
       return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};


module.exports = { signUpAPI, loginAPI }