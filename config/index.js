import convict from 'convict';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import winston from 'winston';

import pkg from '../package.json';

const config = convict({
    env: {
        doc: `Environment the application is running in`,
        format: String,
        default: `production`,
        env: `NODE_ENV`
    },
    logger: {
        level: {
            doc: `Logging level`,
            format: [`silly`, `debug`, `verbose`, `info`, `warn`, `error`],
            default: `info`,
            env: `LOG_LEVEL`,
            arg: `log-level`
        },
        morgan: {
            doc: `Tokens to use for HTTP logging`,
            format: String,
            default: `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time`,
            env: `HTTP_LOG_FORMAT`
        }
    },
    version: {
        doc: `Version of the application`,
        format: (val) => semver(val) !== null,
        default: pkg.version
    },
    server: {
        host: {
            doc: `Hostname/IP for the server`,
            default: `0.0.0.0`,
            env: `HOSTNAME`
        },
        port: {
            doc: `Port for the server to listen on`,
            default: `3000`,
            format: 'port',
            env: `PORT`
        }
    }
});

const env = config.get(`env`);
const filepath = path.join(__dirname, `config.${env}.json`);
if (fs.existsSync(filepath)) {
    config.loadFile(filepath);
}

config.validate();

winston.level = config.get(`logger.level`);

export default config;
