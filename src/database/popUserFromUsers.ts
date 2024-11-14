import { MongoClient } from "mongodb";
import { User } from "../models/User";

// pop first user from "users" collection
export const popUserFromUsers = async (
    client: MongoClient,
): Promise<User | null> => {
    const db = client.db();
    const users = db.collection("users");
    const first_user = users.findOne<User>({});
    users.deleteOne({})
    return first_user
}