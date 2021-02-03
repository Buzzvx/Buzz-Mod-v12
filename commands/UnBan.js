const Discord = require("discord.js");
const log = require("../loge.json")
const buzz = require("../buzz.json")
const moment = require("moment")
const client = new Discord.Client();

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.BanHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ") || "Sebep Belirtilmemiş";
let buzzembed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL())
if(!member) return message.channel.send(buzzembed.setDescription(`Bir Kullanıcı Etiketlemelisiniz`)).then(buzz => buzz.delete({timeout:6000}))
if(!sebep) return message.channel.send(buzzembed.setDescription(`Lütfen Sebep Yazınız Yoksa Yetkililere Mesaj Atacagım`))
////////////////////////////////////
message.guild.members.unban(member)
message.react(buzz.OnaylıEmoji)
/////////////////////////////////
message.channel.send(buzzembed.setDescription(`${member} **(${member.id})** Adlı Kullanıcının Banı Kaldırıldı`)).then(buzz => buzz.delete({timeout:6000}))
if(log.BanLog) return message.channel.send(buzzembed.setDescription(`
${member} **(${member.id})** Adlı Kullanıcının Banı **Kaldırıldı**

•Yetkili: ${message.author} **(${message.author.id})**
•Kaldırılma Tarihi: **${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")}**

•Kaldırılma Sebep: ${sebep}

`))

}
exports.conf = {
    command: "unban",
    description: "Kullanıcının Banını Kaldırır",
    aliases: ["unbanned"]
  }
  

