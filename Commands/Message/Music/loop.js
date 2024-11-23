const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "loop",
  aliases: ["lp", "lop"],
  description: `toggle queue/song/off repeat mode`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
run: async (client, message, args, prefix, queue) => {

 
    // Code
    let loopmode = args[0];
    let mods = ["song", "s", "queue", "q", "off"];
    
    // إذا لم يتم تحديد الوضع الصحيح للتكرار
    if (!loopmode) {
      // تحقق من الوضع الحالي للتكرار
      let currentRepeatMode = queue.repeatMode; // الحصول على وضع التكرار الحالي
      // حالة التكرار إذا كان غير مفعل
      if (currentRepeatMode === 0) {
        await queue.setRepeatMode(1); // تفعيل تكرار الأغنية
        return client.embed(
          message,
          `** ${client.config.emoji.SUCCESS} Song Loop Enabled!! **`
        );
      } else if (currentRepeatMode === 1) {
        await queue.setRepeatMode(0); // تعطيل التكرار
        return client.embed(
          message,
          `** ${client.config.emoji.ERROR} Loop Disabled!! **`
        );
      } else if (currentRepeatMode === 2) {
        await queue.setRepeatMode(0); // تعطيل التكرار
        return client.embed(
          message,
          `** ${client.config.emoji.ERROR} Loop Disabled!! **`
        );
      }
    }

    // التحقق من الوضع المحدد (إذا تم تحديده)
    if (!mods.includes(loopmode)) {
      return client.embed(
        message,
        `Wrong Usage :: \`\`\`${mods.join(" ' ")}\`\`\``
      );
    }

    // أوامر أخرى حسب الوضع المحدد
    if (loopmode === "off") {
      await queue.setRepeatMode(0);
      return client.embed(
        message,
        `** ${client.config.emoji.ERROR} Loop Disabled!! **`
      );
    } else if (loopmode === "song" || loopmode === "s") {
      await queue.setRepeatMode(1);
      return client.embed(
        message,
        `** ${client.config.emoji.SUCCESS} Song Loop Enabled!! **`
      );
    } else if (loopmode === "queue" || loopmode === "q") {
      await queue.setRepeatMode(2);
      return client.embed(
        message,
        `** ${client.config.emoji.SUCCESS} Queue Loop Enabled!! **`
      );
    }
  },
};
