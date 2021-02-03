const Discord = require("discord.js")
const buzz = require("../buzz.json")
const log = require("../loge.json")
const moment = require("moment")

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.JailHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.JailHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ") || "Sebep belirtilmedi";
let BuzzEmbed = new Discord.MessageEmbed().setColor("AQUA").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
if(!member) return message.channel.send(BuzzEmbed.setDescription(`Bir Kullanıcı Etiketlemeniz Lazım **@Üye/İD**`))
if (member.id === message.author.id) return message.channel.send(BuzzEmbed.setDescription(`**Kendi Cezanı Kaldıramazsın**`)).then(buzz => buzz.delete({timeout:5000})) 
if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(BuzzEmbed.setDescription(`Etiketlediğiniz Kullanıcı Sizinle Aynı **Rolde** Veya Sizden **Yüksek** Rolde`)).then(buzz => buzz.delete({timeout:5000}))
////////////////
moment.locale("tr");
message.react(buzz.OnaylıEmoji)
////////////////////
if(member.roles.cache.has(buzz.Booster)){
member.roles.set([buzz.Kayıtsız, buzz.Kayıtsız2, buzz.Booster]).catch()
}else{
member.roles.set([buzz.Kayıtsız, buzz.Kayıtsız2]).catch()
}
///////////////////
message.channel.send(BuzzEmbed.setDescription(`${member}, Adlı Kullanıcının <@&${buzz.JailRol}> Cezası ${message.author} Yetkili Tarafından Kaldırıldı`)).then(buzz => buzz.delete({timeout:8000})) 
message.guild.channels.cache.get(log.BanLog).send(BuzzEmbed.setDescription(`
${member} \`(${member.id})\` **Adlı Kullanıcının Jail Cezası Kaldırıldı*

• Yetkili: ${message.author} \`(${message.author.id})\`
• Kaldırılma Tarih: **${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")}**

• Sebep: ${sebep}

`))

}
exports.conf = {
    command: "unjail",
    description: "Sunucuda Kullanıcının Cezasını Kaldırır",
    aliases: ["unjaıl","unceza","cezakaldır"]
  }
  