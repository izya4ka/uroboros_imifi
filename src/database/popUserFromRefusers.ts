import { MongoClient } from "mongodb";
import { User } from "../models/User";

// pop first user from "refusers" collection
export const popUserFromRefusers = async (
    client: MongoClient,
): Promise<User | null> => {
    const db = client.db();
    const users = db.collection("refusers");
    const first_user = users.findOne<User>({want_to_back: true});
    users.deleteOne({})
    return first_user
}