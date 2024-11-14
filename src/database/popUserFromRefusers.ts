import { MongoClient } from "mongodb";
import { User } from "../models/User";

/**
 * Pop first user from "refusers" collection
 * @param client - MongoClient instance
 * @returns {Promise<User | null>} - Returns the first user from "refusers" collection or null if no user is found
 */

export const popUserFromRefusers = async (
    client: MongoClient,    
): Promise<User | null> => {
    const db = client.db();
    const users = db.collection("refusers");
    const first_user = users.findOne<User>({want_to_back: true});
    users.deleteOne({})
    return first_user
}