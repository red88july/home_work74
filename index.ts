import express from 'express';
const app = express();

const port = 8000;
const favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.listen(port, () => {
    console.log(`Server is running on ${port} port!`);
})