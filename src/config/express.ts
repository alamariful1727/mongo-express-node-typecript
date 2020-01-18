import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import logger = require('morgan');
import Routes from '../index.route';
import config = require('./env/index');
import cookieParser = require('cookie-parser');
import cors = require('cors');
import { MongoDB } from './db';

class App {
	public _express: Application;
	public _mongo: MongoDB;

	constructor() {
		this._express = express();
		// connect mongoDB
		this._mongo = new MongoDB();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		if (config.NODE_ENV === 'development') {
			this._express.use(logger('dev'));
		}
		this._express.use(bodyParser.json());
		this._express.use(bodyParser.urlencoded({ extended: true }));
		this._express.use(cookieParser());
		// enable CORS - Cross Origin Resource Sharing
		this._express.use(cors());
	}

	private routes(): void {
		this._express.get(
			'/',
			(req: Request, res: Response, next: NextFunction) => {
				res.send('Typescript App works!!');
			}
		);

		// user route
		this._express.use('/api/v1', Routes);

		// handle undefined routes
		this._express.use(
			'*',
			(req: Request, res: Response, next: NextFunction) => {
				res.send('Make sure url is correct!!!');
			}
		);
	}
}

export default new App()._express;
