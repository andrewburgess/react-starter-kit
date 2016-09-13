const path = require('path');

module.exports = {
    CLIENT_ENTRY: path.join(process.cwd(), 'client'),
    CLIENT_DEV_OUTPUT: path.join(process.cwd(), 'public/assets'),
    CLIENT_PROD_OUTPUT: path.join(process.cwd(), 'dist/public/assets'),
    PUBLIC_PATH: '/assets/',
    VENDOR: [
        'react-dom',
        'react-redux',
        'react-router',
        'react',
        'redial',
        'redux'
    ]
};
