import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res, next) => {
	res.send('Hello');
});

app.listen(port, () => console.log(`Server running on ${port}`));
