import { MongoClient } from "mongodb";
import { User } from "../models/User";

// get first user from "users" collection
export const getFirstUser  = async (
    client: MongoClient,
): Promise<User | null> => {
    const db = client.db();
    const users = db.collection("users");
    const first_user = users.findOne<User>({});
    return first_user;
}