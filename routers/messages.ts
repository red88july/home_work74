// import {Router} from "express";
// import {Message, Messages} from "../types";
// import {promises as fs} from "fs";
// import path from "node:path";
// const messagesRouter = Router();
//
// messagesRouter.post('/', async (req, res) => {
//
//     const dateTime = new Date().toISOString();
//
//     let message: Message = {
//       message: req.body.message,
//       datetime: dateTime
//     };
//
//     res.send(message);
//
//     const fileName = dateTime + '.txt';
//     await fs.writeFile(fileName, JSON.stringify(message));
//
//     console.log(`File saved by name ${fileName}`);
// });
//
//
// messagesRouter.get('/', async (req, res) => {
//    const messagesArray: Messages[] = [];
//    res.send('This is get request');
// });
//
//
// export default messagesRouter;

import {Router} from "express";
import {Message} from "../types";
import {promises as fs} from "fs";
import path from "path";

const messagesRouter = Router();
const directoryForMessages = path.join(__dirname, 'messages');

messagesRouter.post('/', async (req, res) => {
    const dateTime = new Date().toISOString();
    const message: Message = {
        message: req.body.message,
        datetime: dateTime
    };

    res.send(message);

    const fileName = dateTime + '.txt';
    const addFile = path.join(directoryForMessages, fileName);

    await fs.writeFile(addFile, JSON.stringify(message));
    console.log(`File saved by name ${fileName}`);
});

messagesRouter.get('/', async (req, res) => {
    const MAX_MESSAGES = 5;
    const readDirectory = await fs.readdir(directoryForMessages);
    const filesOnDirectory = readDirectory.filter(files => files.includes('.txt')).slice(0, MAX_MESSAGES);

    const messages = await Promise.all(filesOnDirectory.map(async file => {
        const filePath = path.join(directoryForMessages, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    }) );

    res.json(messages);
});

export default messagesRouter;