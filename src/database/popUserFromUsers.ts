import { MongoClient } from "mongodb";
import { User } from "../models/User";


/**
 * Pop first user from "users" collection
 * @param client - MongoClient instance
 * @returns {Promise<User | null>} - Returns the first user from "users" collection or null if no user is found
 */

export const popUserFromUsers = async (
    client: MongoClient,
): Promise<User | null> => {
    const db = client.db();
    const users = db.collection("users");
    const first_user = users.findOne<User>({});
    users.deleteOne({})
    return first_user
}