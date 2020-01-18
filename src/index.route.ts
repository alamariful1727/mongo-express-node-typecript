import express, { Application } from 'express';
import bodyParser from 'body-parser';
const bookRoutes = require('./Book/book.route');

class Routes {
	public _express: Application;

	constructor() {
		this._express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this._express.use(bodyParser.json());
		this._express.use(bodyParser.urlencoded({ extended: false }));
	}

	private routes(): void {
		// user route
		this._express.get('/book', bookRoutes);
	}
}

export default new Routes()._express;
