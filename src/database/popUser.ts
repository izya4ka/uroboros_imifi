import { MongoClient } from "mongodb";
import { User } from "../models/User";

export const popUser = async (
    client: MongoClient,
    id: number,
    chat_id: number
): Promise<User | null> => {
    const db = client.db();
    const users = db.collection("users");
    const first_user = users.findOne<User>({});
    users.deleteOne({})
    return first_user
}