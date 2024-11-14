import { MongoClient } from "mongodb";
import { User } from "../models/User";
import TelegramBot from "node-telegram-bot-api";

// Add user to the specified collection
export const addUser = async (
    client: MongoClient,
    telegram_user: TelegramBot.User,
    collection: string
) => {
    const db = client.db();
    const users = db.collection(collection);
    const user: User = { id: telegram_user.id, want_to_back: false, user_information: {
        name: telegram_user.first_name,
        last_name: telegram_user.last_name,
    } };

    const user_found = await users.findOne<User>({ id: telegram_user.id });
    if (user_found !== null) throw new Error("User already in database");
    
    await users.insertOne(user);
}