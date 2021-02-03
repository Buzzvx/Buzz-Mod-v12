const Discord = require('discord.js')
const data = require('quick.db')
const buzz = require ('../buzz.json')
const log = require("../loge.json")
const moment = require("moment")
exports.execute = async (client, message, args) => {
if (!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setFooter("Buzz ♣ Code").setAuthor(message.author.tag,message.author.avatarURL()).setTimestamp().setDescription(`**Bu Komutu Kullanmak İçin <@&${buzz.BanHammer}> Rolünde Olmalısınız**`)).then(buzz => buzz.delete({timeout:5000}))         
if(message.channel.id !== log.StaffKanal) return message.channel.send(`Bu Komutu Sadece <#${log.StaffKanal}> Bu Kanalda Kullanabilirsiniz`).then(x => x.delete({timeout: 5000}))
let isim = []
message.guild.members.cache.forEach(user => {
if(user.roles.cache.has(buzz.ÜstYetkili)) { // Buraya Hangi Yetkilierin Staffını Göstermek İstiyorsanız O Permin İD Koyunuz Ben Sadece Örnek Koydum
if(!user.bot) {
if(!user.voice.channel) {
isim.push(`\n▸ <@${user.user.id}>`) }
}}})
  
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor("Yetkili Olup Seste Olmayan Yetkililer;")
.setDescription(`
**${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")}** Güncel Yetkili Staff

\n\n${isim.join('')} \n\n**Sesde Olmamaya Devam Ederseniz Otomatikmen Yetkileriniz Düşecektir**`)
await message.channel.send(embed)

} 
exports.conf = {
    command: "staff",
    description: "Yetkilileri Sayar",
    aliases: ["staffyt"]
  }