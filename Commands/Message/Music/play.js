const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "play",
  aliases: ["p", "song"],
  description: `Play your favorite song by name/link`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: false,
  djOnly: true,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, message, args, queue) => {
    // تحديد ID الرتبة المسموح لها بتشغيل الموسيقى
  
    // التأكد من أن المستخدم أدخل اسم الأغنية أو الرابط
    let song = args.join(" ");
    if (!song) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} You Need to Provide Song Name/Link`
      );
    } else {
      let { channel } = message.member.voice;
      client.distube.play(channel, song, {
        member: message.member,
        textChannel: message.channel,
        message: message,
      });
    }
  },
};
