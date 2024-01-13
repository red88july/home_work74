import {Router} from "express";
import {Message} from "../types";
const messagesRouter = Router();

messagesRouter.post('/', (req, res) => {
    console.log(req.body);
    let date = new Date().toISOString();

    const message: Message = {
      message: req.body.message,
      datetime: req.body.date,
    };

    res.send(message);
});

messagesRouter.get('/', (req, res) => {
    res.send(`This is a GET message!`);
});


export default messagesRouter;