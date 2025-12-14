const express = require('express');
const { addBook, getAllBooks, getBooksByAuthor, updateBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

const authMiddleware = require('../middleware/authmiddleware');
const {validateBook} = require('../middleware/validations');

router.post('/', authMiddleware, validateBook, addBook);
router.get('/',  getAllBooks);
router.get("/author", getBooksByAuthor);
router.put('/:bookId', authMiddleware, validateBook, updateBook);
router.delete('/:bookId', authMiddleware, deleteBook);



module.exports = router;