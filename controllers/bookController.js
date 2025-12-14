const mongoose = require('mongoose');
const dbQueries = require("../dbQueries");
const { success, failure } = require("../utils/response");
const errors = require("../utils/error.js");


// Add a new book
const addBook = async (request, response) => {
    const { title, author, description, genre, pages} = request.body;
    try {
        if (title && author){
            const book = { title, author, description, genre, pages};
            const result = await dbQueries.create(
                            process.env.libraryBookTable,
                            book
                           );
            return success({ status: true, data: result, msg:"Book Added Successfully" }, response);
        }else{
            return failure("BAD_REQUEST", { status: false, error: errors.INV_PARMS}, response);
        }
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};


// Get all books with pagination
const getAllBooks = async (request, response) => {
    const {page = 1, limit = 10} = request.query;
    const skip = (page - 1) * limit;
    try {
        const booksArray = await dbQueries.find(
                            process.env.libraryBookTable,
                            {},
                            {},
                            {skip, limit}
                        );
       return success({status: true, data: booksArray}, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};


//Get Books By Author 
const getBooksByAuthor = async (request, response)=>{
    const { search=""} = request.query;
    try {
        const filter = {};
        filter.author = { $regex: search, $options: "i" };
        const booksArray = await dbQueries.find(
                            process.env.libraryBookTable,
                            filter,
                        );
       return success({status: true, data: booksArray}, response);
    }catch(err){
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
}


// Update a book
const updateBook = async (request, response) => {
    const { bookId } = request.params;
    const { title, author, description, genre, pages, available} = request.body;
    try {
        if (title && author){
            const book = await dbQueries.updateOne(process.env.libraryBookTable, {_id: new mongoose.Types.ObjectId(bookId)}, { title, author, description, genre, pages, available, updatedAt: new Date().toISOString()}, { new: true });
            return success({status: true, data: book, msg: "book updated Successfully"}, response);
        }else{
            return failure("BAD_REQUEST", { status: false, error: errors.INV_PARMS}, response);
        }
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};


// Delete a bookF
const deleteBook = async (request, response) => {
    const { bookId } = request.params;
    try {
        const book = await dbQueries.deleteOne(process.env.libraryBookTable, {_id: new mongoose.Types.ObjectId(bookId)});
        return success({status: true, msg: "Book Deleted Successfully"}, response);
    } catch (err) {
        return failure("ERROR", { status: false, error: errors.PLS_TRY }, response);
    }
};

module.exports = {addBook, getAllBooks, getBooksByAuthor, updateBook, deleteBook}