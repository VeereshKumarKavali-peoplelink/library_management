const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: {type: String},
    genre:{type: String},
    pages: {type: Number},
    available: { type: Boolean, default: true },
    createdAt: { type: String, default: () => new Date().toISOString()},
    updatedAt: { type: String, default: () => new Date().toISOString()},
}, { timestamps: true });



module.exports =
    mongoose.models[process.env.libraryBookTable] ||
    mongoose.model(process.env.libraryBookTable, bookSchema);