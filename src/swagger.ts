import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API Documentation', // Title of your API
      version: '1.0.0', // Version of your API
      description: 'A simple API documentation example',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
