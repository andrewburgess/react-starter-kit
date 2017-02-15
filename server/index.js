import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import logger from 'winston';
import morgan from 'morgan';
import path from 'path';

import config from '../config';

const app = express();

app.set('env', config.get('env'));
app.set('x-powered-by', false);

app.use(compression());

if (config.get('env') === 'production') {
    app.use(helmet());
}

// Route to respond to load balancer health checks
app.get(`/__ping`, (req, res) => { res.set('Content-Type', 'text/plain'); res.send(`pong`); });

app.use(express.static(path.join(__dirname, `../app`)));

app.use(morgan(config.get(`logger.morgan`), {
    stream: {
        write: logger.info
    }
}));

app.use(require('./routes/app').default);

export default app;
