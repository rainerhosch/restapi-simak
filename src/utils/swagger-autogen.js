const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();
const doc = {
    info: {
        version: '1.0.0',
        title: 'WASTUDIG REST API',
        description: 'API endpoints for Wastu Digital services',
        contact: {
            name: "Rizky Oktan",
            email: "rizkyoktan@wastukancana.ac.id",
            url: "https://www.rzoktan.tech/"
        },
    },
    servers: [
        {
            // url: 'http://localhost:'+process.env.PORT+'/api/v1',
            url: 'http://localhost:' + process.env.PORT,
            description: 'Local server'
        },
    ],
    tags: [
        {
            name: 'Mahasiswa',
            description: 'Endpoints related to Mahasiswa data operations'
        },
        {
            name: 'Authentication',
            description: 'Endpoints for user login and token generation'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

const outputFile = '../../src/doc/swagger-output.json';
const routes = ['../../src/app.js']; // Ganti ke app.js agar /api/v1 prefix terdeteksi

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('../../index.js'); // Your project's root file
});
