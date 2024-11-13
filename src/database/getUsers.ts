import { MongoClient } from "mongodb";
import { User } from "../models/User";

const getUsers = async (client: MongoClient, collection: string): Promise<User[]> => {
    let db = client.db();
    let users = db.collection(collection);
    return users.find<User>({}).toArray();
};