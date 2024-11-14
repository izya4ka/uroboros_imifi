import { MongoClient } from "mongodb";
import { User } from "../models/User";

/**
 * Add user to the specified collection
 * @param {MongoClient} client - MongoClient instance
 * @param {TelegramBot.User} telegram_user - User data from Telegram
 * @param {string} collection - Name of the collection where to add user
 * @throws "User already in collection" - If user with the same id already exists in the collection
 */

export const addUser = async (
    client: MongoClient,
    user: User,
    collection: string
) => {
    const db = client.db();
    const users = db.collection(collection);

    const user_found = await users.findOne<User>({ id: user.id });
    if (user_found !== null) throw new Error("User already in collection");
    
    await users.insertOne(user);
}