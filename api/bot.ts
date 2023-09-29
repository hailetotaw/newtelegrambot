import {
  Bot,
  Context,
  InlineKeyboard,
  Middleware,
  webhookCallback,
} from "grammy";
import express from "express";
import { mainServices } from "../constants/mainServices";

const token = "6441810177:AAH4T7fWg9EK1OR5mqTGKtgYHRY6d7hLnF8"; //process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");

// Create an instance of the `Bot` class and pass your bot token to it. test
const bot = new Bot<Context>(token); // <-- put your bot token between the ""

const startHandler: Middleware<Context> = async (ctx, next) => {
  var parentServices = mainServices.filter(
    (service) => service.parentCode === ""
  );
  const keyboard = new InlineKeyboard();
  for (const parent of parentServices) {
    keyboard.text(parent.label, parent.code).row();
  }

  await ctx.replyWithPhoto(
    "https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4",
    {
      caption: "Welcome! Select an option:",
      reply_markup: keyboard,
    }
  );

  await next();
};

const loadPage = (code: string) => {
  const selectedService = mainServices.find((service) => service.code === code);
  const pageKeyboard = new InlineKeyboard();
  const childServices = mainServices.filter(
    (service) =>
      service.parentCode === (selectedService ? selectedService?.code : "")
  );

  if (childServices && childServices.length > 0) {
    for (const service of childServices) {
      pageKeyboard.text(service.label, service.code).row();
    }
  }

  if (code !== "-1") {
    pageKeyboard.text(
      "Back",
      selectedService?.parentCode === "" ? "-1" : selectedService?.parentCode
    );
  }

  return { selectedService, pageKeyboard };
};

bot.on("message", startHandler);

bot.on("callback_query", async (ctx) => {
  const choice = ctx.callbackQuery?.data;
  const { selectedService, pageKeyboard } = loadPage(choice ?? "");

  await ctx.replyWithPhoto(
    selectedService?.imageUrl ??
      "https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4",
    {
      caption: selectedService?.description ?? "Welcome",
      reply_markup: pageKeyboard,
    }
  );

  // Answer the callback query
  await ctx.answerCallbackQuery();
});

// Start the server
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}

export default webhookCallback(bot, "http");
