import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import layout from 'express-layout';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import global_route from './src/global_route';
import admin_route from './src/admin_route';

import config from './config';

const app = express();

app.disable('x-powered-by');

// CORS
app.use(cors());

// Compression
app.use(compression());
app.use(helmet());
app.use(cookieParser());

app.set("config" , __config);
global.__base = __dirname;


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', global_route);
app.use('/admin', admin_route);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { 
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});


const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 

export default app;