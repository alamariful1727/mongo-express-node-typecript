import { Router } from 'express';
import {
	addBook,
	allBooks,
	showBook,
	updateBook,
	deleteBook
} from './book.controller';
const express = require('express');
const router: Router = express.Router();

router
	.route('/')
	.get(allBooks)
	.post(addBook);
router
	.route('/:id')
	.get(showBook)
	.put(updateBook)
	.delete(deleteBook);

module.exports = router;
