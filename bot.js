"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const mainServices_1 = require("./constants/mainServices");
const express_1 = __importDefault(require("express"));
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new grammy_1.Bot("6441810177:AAH4T7fWg9EK1OR5mqTGKtgYHRY6d7hLnF8"); // <-- put your bot token between the ""
const startHandler = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var parentServices = mainServices_1.mainServices.filter((service) => service.parentCode === "");
    const keyboard = new grammy_1.InlineKeyboard();
    for (const parent of parentServices) {
        keyboard.text(parent.label, parent.code).row();
    }
    yield ctx.replyWithPhoto("https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4", {
        caption: "Welcome! Select an option:",
        reply_markup: keyboard,
    });
    yield next();
});
const loadPage = (code) => {
    const selectedService = mainServices_1.mainServices.find((service) => service.code === code);
    const pageKeyboard = new grammy_1.InlineKeyboard();
    const childServices = mainServices_1.mainServices.filter((service) => service.parentCode === (selectedService ? selectedService === null || selectedService === void 0 ? void 0 : selectedService.code : ""));
    if (childServices && childServices.length > 0) {
        for (const service of childServices) {
            pageKeyboard.text(service.label, service.code).row();
        }
    }
    if (code !== "-1") {
        pageKeyboard.text("Back", (selectedService === null || selectedService === void 0 ? void 0 : selectedService.parentCode) === "" ? "-1" : selectedService === null || selectedService === void 0 ? void 0 : selectedService.parentCode);
    }
    return { selectedService, pageKeyboard };
};
bot.on("message", startHandler);
bot.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const choice = (_a = ctx.callbackQuery) === null || _a === void 0 ? void 0 : _a.data;
    const { selectedService, pageKeyboard } = loadPage(choice !== null && choice !== void 0 ? choice : "");
    yield ctx.replyWithPhoto((_b = selectedService === null || selectedService === void 0 ? void 0 : selectedService.imageUrl) !== null && _b !== void 0 ? _b : "https://fastly.picsum.photos/id/522/200/300.jpg?hmac=6-KFAVAX70eulRbHj_faT1bRFPGrXhPiDHXe6zPaH-4", {
        caption: (_c = selectedService === null || selectedService === void 0 ? void 0 : selectedService.description) !== null && _c !== void 0 ? _c : "Welcome",
        reply_markup: pageKeyboard,
    });
    // Answer the callback query
    yield ctx.answerCallbackQuery();
}));
// Start the server
if (process.env.NODE_ENV === "production") {
    // Use Webhooks for the production server
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, grammy_1.webhookCallback)(bot, "express"));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`);
    });
}
else {
    // Use Long Polling for development
    bot.start();
}
