const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tablero de Tareas',
            version: '1.0.0',
            description: 'Documentación de la API del sistema de tareas',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;