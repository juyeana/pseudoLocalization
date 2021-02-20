const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './config.env' });

const pseudo = require('./route/api/pseudo');

const app = express();

// middleware to display logger on the console

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//express : parses the JSON body, buffer, string, and URL encoded data submitted using HTTP POST

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES

app.use('/api/v1/pseudo', pseudo);

if(process.env.NODE_ENV === 'production'){
		  app.use(express.static('client/build'));
		  app.get('*', (req, res) => {
		    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
		  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
