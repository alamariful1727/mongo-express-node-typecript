import * as Joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();

let path: string;
switch (process.env.NODE_ENV) {
	case 'production':
		path = `${__dirname}/../../.env.production`;
		break;
	case 'development':
		path = `${__dirname}/../../.env.development`;
		break;
	default:
		path = `${__dirname}/../../.env`;
}

dotenv.config({ path: path });

// define validation for all the env vars
const envSchema = Joi.object().keys({
	NODE_ENV: Joi.string()
		.allow(['development', 'production', 'test'])
		.required(),
	PORT: Joi.number().required(),
	MONGO_HOST: Joi.string().required()
});

// Joi validation options
const _validationOptions = {
	abortEarly: false, // abort after the last validation error
	allowUnknown: true, // allow unknown keys that will be ignored
	stripUnknown: true // remove unknown keys from the validated data
};

const { error, value } = envSchema.validate(process.env, _validationOptions);

interface IConfig {
	NODE_ENV: any;
	PORT: any;
	MONGO_HOST: any;
}

let config: IConfig = {
	NODE_ENV: '',
	PORT: 4000,
	MONGO_HOST: ''
};

if (error as any) {
	console.error({
		name: error.name,
		details: error.details
	});
	process.exit(1);
} else {
	config = {
		NODE_ENV: value.NODE_ENV,
		PORT: value.PORT,
		MONGO_HOST: value.MONGO_HOST
	};
}

export = config;
