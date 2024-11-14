import { MongoClient } from "mongodb";
import { User } from "../models/User";

/**
 * Get all users from "users" collection
 * @param {MongoClient} client - MongoClient instance
 * @returns {Promise<User[]>} - Returns all users from "users" collection
 */

export const getUsers = async (client: MongoClient): Promise<User[]> => {
    let db = client.db();
    let users = db.collection("users");
    return users.find<User>({}).toArray();
};