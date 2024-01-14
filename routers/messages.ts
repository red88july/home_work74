import {Router} from "express";
import {Message} from "../types";
import {promises as fs} from "fs";
const messagesRouter = Router();

messagesRouter.post('/', async (req, res) => {
    console.log(req.body);
    const dateTime = new Date().toISOString();

    const message: Message = {
      message: req.body.message,
      datetime: dateTime
    };

    res.send(message);

    const fileName = dateTime + '.txt';
    await fs.writeFile(fileName, JSON.stringify(message));
    console.log(`File saved by name ${fileName}`);
});


messagesRouter.get('/', (req, res) => {
    res.send(`This is a GET message!`);
});


export default messagesRouter;