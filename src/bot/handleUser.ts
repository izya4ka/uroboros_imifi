import {addUser} from "../database/addUser";
import TelegramBot from "node-telegram-bot-api";
import { MongoClient } from "mongodb";
import { User } from "../models/User";
/**
 * Handle /start command and add user to "users" collection
 * @param {TelegramBot.Message} msg - Telegram message object
 * @param {TelegramBot} bot - Telegram bot instance
 * @param {MongoClient} client - MongoClient instance
 * @param {TelegramBot.SendMessageOptions} sendOpts - Send options for Telegram message
 */
export const handleUser = async (
    msg:TelegramBot.Message,
    bot:TelegramBot,
    client: MongoClient,
    sendOpts: TelegramBot.SendMessageOptions
) => {
    let user = msg.from;
    if (user === undefined) return;
    try {
        // Add user to the "users" collection if it's not already there
        let user_to_add: User = {id: user.id, want_to_back: false, user_information: {name: user.first_name, last_name: user.last_name}  }; 
        await addUser (client, user_to_add, "users");
        console.log("Added user with ID: " + user.id);
        await bot.sendMessage(msg.chat.id, "Вы записаны в очередь!", sendOpts);
      } catch (err) {
        console.log(err);
      }
}