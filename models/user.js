const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId: {type: String, unique: true, default: () => uuidv4(),},
    name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });


module.exports =
    mongoose.models[process.env.libraryUserTable] ||
    mongoose.model(process.env.libraryUserTable, userSchema);