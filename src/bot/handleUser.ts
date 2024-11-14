import {addUser} from "../database/addUser";
import TelegramBot from "node-telegram-bot-api";
import { MongoClient } from "mongodb";

// handle /start command and add user to "users" collection
export const handleUser = async (
    msg:TelegramBot.Message,
    bot:TelegramBot,
    client: MongoClient,
    sendOpts: TelegramBot.SendMessageOptions
) => {
    let user = msg.from;
    if (user === undefined) return;
    try {
        await addUser (client,  user, "users");
        console.log("Added user with ID: " + user.id);
        await bot.sendMessage(msg.chat.id, "Вы записаны в очередь!", sendOpts);
      } catch (err) {
        console.log(err);
      }
}