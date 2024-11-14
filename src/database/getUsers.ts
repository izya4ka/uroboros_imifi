import { MongoClient } from "mongodb";
import { User } from "../models/User";

// Get all users from the "users" collection
const getUsers = async (client: MongoClient): Promise<User[]> => {
    let db = client.db();
    let users = db.collection("users");
    return users.find<User>({}).toArray();
};