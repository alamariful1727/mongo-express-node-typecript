import express from 'express';
import bodyParser from 'body-parser';
// const User = require('./server/user/user.route');

class Routes {
	public express: express.Application;

	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

	private routes(): void {
		// user route
		// this.express.use('/user', User);
	}
}

export default new Routes().express;
