import { MongoClient } from "mongodb";
import { getUsers } from "../database/getUsers.ts";
import TelegramBot from "node-telegram-bot-api";
import { User } from "../models/User.ts";

/**
 * Show users that are currently in queue
 * @param msg - User's message from Telegram
 * @param db_con - MongoClient instance
 * @param bot - TelegramBot instance for sending messages
 */

export const showQueue = async (msg: TelegramBot.Message, db_con: MongoClient, bot: TelegramBot) => {
    let all_users: User[] = await getUsers(db_con);
    let result_message: string = "Сейчас в очереди:\n";
    for (let i = 0; i < all_users.length; i++) {
        result_message += `${i + 1}. ${all_users[i].user_information.name} ${all_users[i].user_information.last_name || ""}\n`;
    }
 
    bot.sendMessage(msg.chat.id, result_message);
}