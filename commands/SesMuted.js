const Discord = require("discord.js");
const ms = require('ms')
const data = require("quick.db")
const moment = require('moment')
const buzz = require('../buzz.json')
const log = require("../loge.json")


exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.VoiceYetkili)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.VoiceYetkili}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
let member = message.mentions.members.first() || message.guild.members.get(args[0])
let buzzembed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
if(!member) return message.channel.send(`Lütfen, susturacağım kullanıcıyı belirtin.`)

if(!member.voiceChannel) return message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcı Ses Kanallarında Bulunmadığı İçin Mute Atamadım`))

if(member.serverMute === true) return message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcı Zaten Muteli`))

let time = args[1]
if(!time || !ms(time)) return message.channel.send(buzzembed.setDescription(`Bir Süre Limiti Belirleyiniz [s/ Saniye] [m/ Dakika] [h/ Saat] [d/ Gün]`))

let Sebep = args.slice(2).join(' ') || "Sebep Belirtilmemiş"
let MuteBitiş = Date.now() + ms(time)

moment.locale('tr')
message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcı ${message.author} Yetkili Tarafından **${time.replace(/d/, " gün").replace(/s/, " saniye").replace(/m/, " dakika").replace(/h/, " saat")}** Süre Kadar Voice Kanallarında Susturuldu`)).then(buzz => buzz.delete({timeout:5000}))
member.voice.setMute(true);
if(log.MuteLog) return message.channel.send(buzzembed.setDescription(`
${member} **(${member.id})** Adlı Kullanıcı Ses Kanallarında Susturuldu

•Yetkili: ${message.author} **(${message.author.id})**
•Mute Tarih: **(${moment(Date.now()).format("Do MMMM YYYY ddd HH:mm:ss")})**
•Mute Bitiş: **(${moment(MuteBitiş).format("Do MMMM YYYY dddd HH:mm:ss")})**

•Sebep: **${Sebep}**
`))

setTimeout(() => {
if(member.serverMute === false) return 

member.voice.setMute(false);
if(log.MuteLog) return message.channel.send(buzzembed.setDescription(`
${member} **(${member.id})** Adlı Kullanıcı Ses Kanallarında Mute Süresi Doldugu İçin Susturulması Kalktı

•Yetkili: ${message.author} **(${message.author.id})**
•Mute Bitiş: **(${moment(MuteBitiş).format("Do MMMM YYYY dddd HH:mm:ss")})**

•Sebep: **${Sebep}**
`))

}, ms(time));
data.set(`MuteCezası.${mention.id}.${message.guild.id}`, time)

}
exports.conf = {
    command: "vmute",
    description: "İstediğiniz Kullanıcıyı Ses Kanallarında Susturur",
    aliases: ["vmute","sesmute","seslisustur","vtempmute"]
  }