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
    await users.insertOne(user);
}