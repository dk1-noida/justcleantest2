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

import config from './config';

const app = express();
global.__config = config();

// CORS
app.use(cors());

// Compression
app.use(compression());
app.use(helmet());
app.use(cookieParser());



app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

app.get("/" , (req , res)=>{  
  res.render('index.jade', { title: 'Express testing' });    
});

import routes from './src/admin_route';
app.use('/admin', routes);

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