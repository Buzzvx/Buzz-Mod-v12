const Discord = require("discord.js")
const buzz = require("../buzz.json")
const log = require("../loge.json")
const moment = require("moment")

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.Rolhammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.RolHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
let BuzzEmbed = new Discord.MessageEmbed().setColor("AQUA").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
if(!member) return message.channel.send(BuzzEmbed.setDescription(`Bir Kullanıcı Etiketlemeniz Lazım **@Üye/İD**`))
if (member.id === message.author.id) return message.channel.send(BuzzEmbed.setDescription(`**Kendine Vip Rolü Veremezsin**`)).then(buzz => buzz.delete({timeout:5000})) 
if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(BuzzEmbed.setDescription(`Etiketlediğiniz Kullanıcı Sizinle Aynı **Rolde** Veya Sizden **Yüksek** Rolde`)).then(buzz => buzz.delete({timeout:5000}))
////////////////
moment.locale("tr");
member.roles.add(buzz.vip)
message.react(buzz.OnaylıEmoji)
////////////////////
message.channel.send(BuzzEmbed.setDescription(`${member}, Adlı Kullanıcıya <@&${buzz.vip}> Rolü verildi`)).then(buzz => buzz.delete({timeout:6000})) 
message.guild.channels.cache.get(log.RolVermelog).send(BuzzEmbed.setDescription(`
${member} \`(${member.id})\` **Adlı Kullanıcıya <@&${buzz.vip}> Rolü Verildi**

• Yetkili: ${message.author} \`(${message.author.id})\`
• Tarih: **${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")}**


`))

}
exports.conf = {
    command: "vip",
    description: "Kullanıcıya Vip Rolü Verir",
    aliases: ["vıp","vip","vips","vıps"]
  }
  