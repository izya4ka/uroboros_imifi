import {addUser} from "../database/addUser";
import TelegramBot from "node-telegram-bot-api";
import { MongoClient } from "mongodb";

export const handleUser = async (
    msg:TelegramBot.Message,
    bot:TelegramBot,
    client: MongoClient,
    sendOpts: TelegramBot.SendMessageOptions
) => {
    let userId = msg.from?.id;
    if (userId === undefined) return;
    try {
        await addUser (client,  userId, msg.chat.id, "users");
        console.log("Added user with ID: " + userId);
        await bot.sendMessage(msg.chat.id, "Вы записаны в очередь!", sendOpts);
      } catch (err) {
        console.log(err);
      }
}