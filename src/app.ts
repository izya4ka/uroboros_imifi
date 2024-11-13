import { MongoClient } from "mongodb";
import TelegramBot from "node-telegram-bot-api";
import { addUser } from "./database/addUser";
require("dotenv").config();

const track_refresh_interval = process.env.TRACK_REFRESH_INTERVAL;

const db = {
  url: process.env.MONGODB_URL,
  name: process.env.MONGODB_DATABASE,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
};

const web_app_url = process.env.WEB_APP_URL || "";

const token = process.env.TELEGRAM_TOKEN || "";
const bot = new TelegramBot(token, { polling: true });


const send_opts = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Редактировать треки", web_app: { url: web_app_url } }],
    ],
  },
};

const db_client = new MongoClient(
  `mongodb://${db.user}:${db.password}@${db.url}/${db.name}`
);

db_client.connect().then((db_con) => {
  console.log("[Bot and MongoDB] Started!");

  bot.onText(
    /^[Мм]еню$/,
    async (msg) =>
      await bot.sendMessage(msg.chat.id, "Выберите опцию", send_opts)
  );

//   bot.onText(/^\/start$/, async (msg) => {
//     handleUser(msg, db_con, bot, send_opts);
//   });


  setInterval(() => {
  }, 60000);
});