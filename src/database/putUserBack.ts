import { MongoClient } from "mongodb";
import { User } from "../models/User";

export const putUserBack = async (
    client: MongoClient,
    user: User
) => {
    const db = client.db();
    const users = db.collection("users");
    users.insertOne(user);
}