const path = require('path');

module.exports = {
    openapi: '3.0.0',
    info: {
        // API informations (required)
        title: 'STAT.GOV NODE API', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'APIs for additional functionalities of stat.gov.af', // Description (optional)
    },
    servers: [
        { url: 'http://localhost:3000' }
    ],
    apis: [path.join(__dirname, './src/**/**/*.ts')]
};
