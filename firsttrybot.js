"use strict";
// import { Bot, Context, InlineKeyboard, Middleware, session } from "grammy";
// import { chunk } from "lodash";
// import { mainServices } from "./constants/mainServices";
// // Create an instance of the `Bot` class and pass your bot token to it.
// const bot = new Bot<Context>("6441810177:AAH4T7fWg9EK1OR5mqTGKtgYHRY6d7hLnF8"); // <-- put your bot token between the ""
// const introductionMessage = (userName: string) => `Hello ${
//   userName === "undefined" ? "" : userName
// }! I'm a Telegram bot.
// a sample app
// <b>Commands</b>
// /yo - Be greeted by me
// /effect [text] - Show a keyboard to apply text effects to [text]`;
// const aboutUrlKeyboard = new InlineKeyboard().url(
//   "Host your own bot for free.",
//   "https://cyclic.sh/"
// );
// const replyWithIntro = (ctx: any) =>
//   ctx.reply(introductionMessage(ctx.from?.userName), {
//     reply_markup: aboutUrlKeyboard,
//     parse_mode: "HTML",
//   });
// const mainPage = () => {
//   var parentServices = mainServices.filter(
//     (service) => service.parentCode === ""
//   );
//   for (const mainService of parentServices) {
//     bot.callbackQuery(
//       serviceCallbackCodeAccessor(mainService.code),
//       async (ctx) => {
//         ctx.reply(nextPage(""), {
//           reply_markup: servicesKeyboardAccessor(
//             mainServices
//               .filter((service) => service.parentCode === mainService.code)
//               .map((service) => service.code)
//           ),
//         });
//       }
//     );
//   }
//   return `What are you looking for?`;
// };
// const nextPage = (code: string) => {
//   console.log("lest what code is", code);
//   return "this is the second page";
// };
// const serviceCallbackCodeAccessor = (serviceCode: string) =>
//   `effect-${serviceCode}`;
// const servicesKeyboardAccessor = (serviceCodes: string[]) => {
//   const serviceAccessor = (serviceCodes: string[]) =>
//     serviceCodes.map((serviceCode) =>
//       mainServices.find((service) => service.code === serviceCode)
//     );
//   const services = serviceAccessor(serviceCodes);
//   const keyboard = new InlineKeyboard();
//   const chunkedServices = chunk(services, 3);
//   for (const servicesChunk of chunkedServices) {
//     for (const service of servicesChunk) {
//       service &&
//         keyboard.text(service.label, serviceCallbackCodeAccessor(service.code));
//     }
//     keyboard.row();
//   }
//   return keyboard;
// };
// bot.inlineQuery("queryRegEx", async (ctx) => {
//   await ctx.answerInlineQuery(
//     [
//       {
//         type: "article",
//         id: "text-effect",
//         title: "Text Effects",
//         input_message_content: {
//           message_text: `Original: `,
//           parse_mode: "HTML",
//         },
//         reply_markup: new InlineKeyboard().switchInline("Share", "fullQuery"),
//         url: "http://t.me/EludaDevSmarterBot",
//         description: "Create stylish Unicode text, all within Telegram.",
//       },
//     ],
//     { cache_time: 30 * 24 * 3600 } // one month in seconds
//   );
// });
// bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
// // for (const mainService of mainServices) {
// //   const allServiceCodes = mainServices.map((service) => service.code);
// //   bot.callbackQuery(
// //     serviceCallbackCodeAccessor(mainService.code),
// //     async (ctx) => {
// //       console.log("this ihe se", mainService.code);
// //       ctx.reply(nextPage(""), {
// //         reply_markup: servicesKeyboardAccessor(
// //           mainServices
// //             .filter((service) => service.parentCode === mainService.code)
// //             .map((service) => service.code)
// //         ),
// //       });
// //     }
// //   );
// // }
// bot.api.setMyCommands([
//   { command: "yo", description: "Be greeted by the bot" },
//   {
//     command: "effect",
//     description: "Apply text effects on the text. (usage: /effect [text])",
//   },
// ]);
// bot.command("start", replyWithIntro);
// bot.command("effect", (ctx) =>
//   ctx.reply(mainPage(), {
//     reply_markup: servicesKeyboardAccessor(
//       mainServices
//         .filter((service) => service.parentCode === "")
//         .map((service) => service.code)
//     ),
//   })
// );
// bot.on("message", replyWithIntro);
// bot.start();
