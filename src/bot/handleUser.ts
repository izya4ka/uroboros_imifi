import {addUser} from "../database/addUser";
import TelegramBot from "node-telegram-bot-api";
import { MongoClient } from "mongodb";

const handleUser = async (
    msg:TelegramBot.Message,
    bot:TelegramBot,
    client: MongoClient
) => {
    let userId = msg.from?.id;
    if (userId === undefined) return;
    await addUser (client,  userId, msg.chat.id);
    await bot.sendMessage(msg.chat.id, "Вы записаны в очередь!");
}