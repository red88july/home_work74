import path from "path";
import {promises as fs} from "fs";
import {Router} from "express";
import {Message} from "../types";

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

    const messagesOnArray = await Promise.all(filesOnDirectory.map(async file => {
        const filePath = path.join(directoryForMessages, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    }) );

    res.json(messagesOnArray);
});

export default messagesRouter;