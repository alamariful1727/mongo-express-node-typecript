import App from './config/express';
import mongoose = require('mongoose');
import config = require('./config/index');

// make bluebird default Promise
Promise = require('bluebird');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.MONGO_HOST;
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
mongoose.connection.on('open', () => {
	console.info(`Successfully connect to database: ${mongoUri}`);
});
mongoose.connection.on('error', (err: any) => {
	console.error(err);
});

// start server
App.listen(config.PORT, () => {
	console.info(`server started on port ${config.PORT} (${config.NODE_ENV})`);
});

module.exports = App;
