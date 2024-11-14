import { MongoClient } from "mongodb";
import TelegramBot from "node-telegram-bot-api";
import { handleUser } from "./bot/handleUser"
import { showQueue } from "./bot/showQueue";
require("dotenv").config();

const db = {
  url: process.env.MONGODB_URL,
  name: process.env.MONGODB_DATABASE,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
};

const lessons =
  [
    {
      name: "Дискретная математика",
      days: [{
        day: "Вторник",
        time: "12:00",
        duration: 6300
      }],
    },
    {
      name: "Дифференциальные уравнения",
      days: [{
        day: "Пятница",
        time: "14:10",
        duration: 6300,
      }]
    }
  ]

const token = process.env.TELEGRAM_TOKEN || "";
const bot = new TelegramBot(token, { polling: true });

const send_opts = {
  reply_markup: {
    keyboard: [
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

  bot.onText(/^\/start$/, async (msg) => {
    handleUser(msg, bot, db_con, send_opts);
  });


  bot.onText(/^Показать очередь$/m, async (msg) => {
    showQueue(msg, db_con, bot);
  })

  /*
   * что-то типа bot.onText("Вернуться в очередь", (msg) => { пам-пам-парам-пам })
   * 
   * при нажатии на кнопку "Вернуться в очередь" придётся падумать о том, как это реализовать,
   * ибо нельзя вернуться, пока другой человек отвечает, ну кароче в главном круге уробороса реализуем чонить
   */

  // TODO Реализовать бесконечный круг во время пары

  setInterval(() => {

  }, 60000); // Every minute check for lessson started

});