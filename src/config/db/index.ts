import mongoose = require('mongoose');
import config = require('./../env/index');

// make bluebird default Promise
Promise = require('bluebird');

interface IConnectOptions {
	useNewUrlParser: boolean;
	useCreateIndex: boolean;
	useFindAndModify: boolean;
	useUnifiedTopology: boolean;
}

export class MongoDB {
	public _connectOptions: IConnectOptions;
	public _mongoose: any = mongoose;

	constructor(
		options: IConnectOptions = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		}
	) {
		this._connectOptions = options;

		// plugin bluebird promise in mongoose
		this._mongoose.Promise = Promise;

		// connect to mongo db
		this.connect();
	}

	private connect(): void {
		const mongoUri = config.MONGO_HOST;
		this._mongoose.connect(mongoUri, this._connectOptions);
		this._mongoose.connection.on('open', () => {
			console.info(`Successfully connect to database: ${mongoUri}`);
		});
		this._mongoose.connection.on('error', (err: any) => {
			console.error(err);
		});
	}
}
