import http from 'http';
import logger from 'winston';

import config from './config';

import server from './server';

const startServer = function () {
    return new Promise((resolve, reject) => {
        const instance = http.createServer(server);
        instance.on('listening', () => {
            resolve(instance);
        });
        instance.on('error', reject);
        instance.listen(config.get('server.port'), config.get('server.host'));
    });
};

Promise.resolve()
.then(startServer)
.then(() => {
    logger.info(`server v${config.get(`version`)} listening on ${config.get(`server.host`)}:${config.get(`server.port`)}`);
})
.catch((err) => {
    logger.error(`server failed to start`);
    logger.error(err);

    process.exit(1);
});
