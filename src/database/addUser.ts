import { MongoClient } from "mongodb";
import { User } from "../models/User";

export const addUser = async (
    client: MongoClient,
    id: number,
    chat_id: number,
    collection: string
) => {
    const db = client.db();
    const users = db.collection(collection);
    const user: User = { id, want_to_back: false, chat_id };

    const user_found = await users.findOne<User>({ id });
    if (user_found !== null) throw new Error("User already in database");
    
    await users.insertOne(user);
}