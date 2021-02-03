const Discord = require("discord.js")
const buzz = require("../buzz.json")
const log = require("../loge.json")
const data = require("quick.db")
const moment = require("moment")

exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.MuteYetkili}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    let embed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
    if (!member) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bir Kullanıcı Belirtmeniz Lazım **@Üye/İD**`).setTimestamp()).then(x => x.delete({ timeout: 8000 }))
    if (!member.roles.cache.get(buzz.MuteRol)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${member}, Adlı Kullanıcı **Mutelenmemiş**`).setTimestamp()).then(x => x.delete({ timeout: 8000 }))

    /////////////////////////////////////
    member.roles.remove(buzz.MuteRol)
        /////////////////////////////////////
    moment.locale("tr");
    message.channel.send(embed.setDescription(`${member}, Adlı Kullanıcının **Chat-Muted** Cezasını <@!${message.author.id}> Yetkili Tarafından Kaldırıldı`)).then(x => x.delete({ timeout: 7000 }))
    if (log.MuteLog) return message.channel.send(embed.setDescription(`
  ${member} \`(${member.id})\` **Adlı Kullanıcının Chat-Muted Cezası Kaldırıldı**

  Yetkili: <@!${message.author.id}> \`(${message.author.id})\`
  Kaldırılma Tarihi: **${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")}**

  `))
  data.delete(`Chatmute.${member.user.id}.${message.guild.id}`)
}
exports.conf = {
    command: "unmute",
    description: "Kullanıcının Mute Cezasını Kaldırır",
    aliases: ["unmute","unmüte"]
  }