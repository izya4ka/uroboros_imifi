import { MongoClient } from "mongodb";
import TelegramBot from "node-telegram-bot-api";
import { handleUser } from "./bot/handleUser"
require("dotenv").config();

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
      [
        {
          text: 'Показать очередь',
          callback_data: 'show_queue'
        }
      ],
      [
        {
          text: 'Вернуться в очередь',
          callback_data: 'back_in_queue'
        }
      ]
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

  bot.onText(/^\/start$/, async (msg) => {
    handleUser(msg, bot, db_con, send_opts);
  });

  setInterval(() => {
  }, 60000);
});