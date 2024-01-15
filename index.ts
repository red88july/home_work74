import express from 'express';
import messagesRouter from "./routers/messages";

const app = express();
const favicon = require('serve-favicon');
const port = 8000;

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(express.json());

app.use('/messages', messagesRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port!`);
});