const Discord = require("discord.js")
const moment = require("moment")
const Kayıtvx = require("../Kayıt.json")
const Emoji = require ("../buzz.json")
const Buzz = require("../buzz.json")
const data = require("quick.db")
exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(Kayıtvx.KayıtYetkili) && !message.member.roles.cache.has(Kayıtvx.KayıtYetkili2)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.KayıtYetkili2}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    let buzzembed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
if(!member) return message.channel.send(buzzembed.setDescription(`Bir Kullanıcı Etiketle Lütfen`)).then(buzz => buzz.delete({timeout:5000}))
if(member.roles.cache.has(Buzz.Kayıtsız)) return message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcı Zaten **Kayıtsız** Rolünde`)).then(buzz => buzz.delete({timeout:5000}))
///////////////////////////////////////////////////////////////////////////////////
let KayıtSayısı = await data.fetch(`kayıtVeri_${message.author.id}`)
if(!KayıtSayısı) KayıtSayısı = "0"
data.add(`kayıtVeri_${message.author.id}`,1)
///////////////////////////////////////////////
if(member.roles.cache.has(Kayıtvx.BoosterİD)){
member.roles.set([Buzz.Kayıtsız, Buzz.Kayıtsız2, Kayıtvx.BoosterİD]).catch()
}else{
member.roles.set([Buzz.Kayıtsız, Buzz.Kayıtsız2]).catch()
}
////////////////////////////////////////////////////////
message.react(Emoji.OnaylıEmoji)
////////////////////////////////////////////////////////
message.channel.send(buzzembed.setDescription(`${member}, AdlI Kullanıcıyı <@&${Buzz.Kayıtsız}> Rolünü Vererek Kayıtsıza Atmış Bulunmaktayım`).setFooter(`Toplam Kayıtınız: ${KayıtSayısı}`))
}
exports.conf = {
    command: "kl",
    description: "Kullanıcıyı Kayıtsıza Atar",
    aliases: ["kayıtsız","kl","ky"]
  }