require('dotenv').config();
const express = require('express');
const massive = require('massive');
const ctrl = require('./products_controller');

const app = express();
const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log("connected to database");
}).catch(err => {
    console.log(err);
})

//ENDPOINTS
app.get('/api/products', ctrl.getAll);
app.get('/api/products/:id', ctrl.getOne);
app.put('/api/products/:id', ctrl.update);
app.post('/api/products', ctrl.create);
app.delete('/api/products/:id', ctrl.delete);

app.listen(SERVER_PORT, () => console.log( `server is listening on: ${SERVER_PORT}`));
