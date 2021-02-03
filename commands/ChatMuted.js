const Discord = require('discord.js');
const ms = require('ms')
const data = require('quick.db')
const moment = require('moment')
const buzz = require('../buzz.json')
const log = require("../loge.json")

exports.execute = async (client, message, args) => {
moment.locale('tr')
if (!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.MuteYetkili)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag,message.author.avatarURL()).setTimestamp().setDescription(`**Bu Komutu Kullanmak İçin <@&${buzz.MuteYetkili}> Rolüne Sahip Olmalısınız**`)).then(buzz => buzz.delete({timeout:5000}))
let BuzzEmbedd = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag,message.author.avatarURL()).setTimestamp()
let role = message.guild.roles.cache.get(buzz.MuteRol) 

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(BuzzEmbedd.setDescription(`Mute Atacağım Kullanıcıyı Belirtiniz\n-\`.tempmute @üye / İD [Süre] [Sebep]\``)).then(buzz => buzz.delete({timeout:5000}))

if(user.roles.cache.has(buzz.MuteRol)) return message.channel.send(BuzzEmbedd.setDescription(`${user}, **Adlı Kullanıcı Zaten Mutelenmiş**`)).then(buzz => buzz.delete({timeout:5000}))

let time = args[1]
if(!time || !ms(time)) return message.channel.send(BuzzEmbedd.setDescription(`Mute Süresini Belirtiniz`)).then(buzz => buzz.delete({timeout:5000}))


let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş"
let açılma_zamanı = Date.now() + ms(time)
let log = message.guild.channels.cache.find(c=> c.id === log.MuteLog)
user.roles.add(role);
data.set(`${message.guild.id}.${user.id}.mute`, reason)
/////////////////////////////////////////
const buzz0102 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${user} Kullanıcısı <@!${message.author.id}> Yetkili Tarafından Chat-Muted Yiyerek Metin Kanallarından Susturuldu`)
message.channel.send(buzz0102).then(buzz => buzz.delete({timeout:8000}))
////////////////////////////////////////
let embed1 = new Discord.MessageEmbed()
.setColor("Black")
.setAuthor(message.author.tag , message.author.avatarURL())
.setDescription(`${user.user} \`(${user.id})\` **Kullanıcı Chat-Muted Yiyerek Metin Kanallarında Susturuldu**
 
• Mute Atan: <@!${message.author.id}> \`(${message.author.id})\`
• Mute Yiyen: ${user.user} \`(${user.id})\`
• Mute-Atış \`${moment(Date.now()).format('Do MMMM YYYY dddd HH:mm:ss')}\`
• Mute-bitiş \`${moment(açılma_zamanı).format('Do MMMM YYYY dddd HH:mm:ss')}\`
• Mute Süre: \`${time.replace(/d/, " gün").replace(/s/, " saniye").replace(/m/, " dakika").replace(/h/, " saat")}\`

• **Sebep:** \`${reason}\`
`)
log.send(embed1)
/////////////////////////////////////7
setTimeout(() => {
if(!user.roles.cache.has(role.id)) return
user.roles.remove(role.id);
data.delete(`${message.guild.id}.${user.id}.mute`)
//////////////////////////////////////
let embed = new Discord.MessageEmbed()
.setColor("AQUA")
.setAuthor(message.author.tag , message.author.avatarURL())
.setDescription(`${user.user} \`(${user.id})\` **Kullanıcı Chat-Muted Süresi Bitdiği İçin Susturulması Kalktı** 
 
• Mute Atan: <@!${message.author.id}> \`(${message.author.id})\`
• Mute Yiyen: ${user.user} \`(${user.id})\`
• Mute-Atış: \`${moment(Date.now()).format('Do MMMM YYYY dddd HH:mm:ss')}\`
• Mute-Bitiş: \`${moment(açılma_zamanı).format('Do MMMM YYYY dddd HH:mm:ss')}\`
• Mute Süre: \`${time.replace(/d/, " gün").replace(/s/, " saniye").replace(/m/, " dakika").replace(/h/, " saat")}\`

• **Sebep:** \`${reason}\`
`)
log.send(embed)
}, ms(time));
///////////////////////////////////////////////////////////////////////
data.set(`Chatmute.${user.id}.${message.guild.id}`, time)
};

exports.conf = {
  command: "tempmute",
  description: "Sunucudan Kullanıcıyı Mute Atar",
  aliases: ["mute","müte","tempmüte"]
}