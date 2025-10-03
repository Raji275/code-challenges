const express = require('express');
const { handler: createHandler } = require('./src/handlers/create');
const { handler: getAllHandler } = require('./src/handlers/getAll');
const { handler: getOneHandler } = require('./src/handlers/getOne');
const { handler: updateHandler } = require('./src/handlers/update');
const { handler: deleteHandler } = require('./src/handlers/delete');

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Convert Lambda response to Express response
const lambdaToExpress = (handler) => async (req, res) => {
  const event = {
    body: JSON.stringify(req.body),
    pathParameters: req.params,
    httpMethod: req.method,
  };
  
  const result = await handler(event);
  res.status(result.statusCode).json(JSON.parse(result.body));
};

// Routes
app.post('/items', lambdaToExpress(createHandler));
app.get('/items', lambdaToExpress(getAllHandler));
app.get('/items/:id', lambdaToExpress(getOneHandler));
app.put('/items/:id', lambdaToExpress(updateHandler));
app.delete('/items/:id', lambdaToExpress(deleteHandler));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
