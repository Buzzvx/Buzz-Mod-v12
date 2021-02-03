const Discord = require("discord.js")
const moment = require("moment")
const Kayıtvx = require("../Kayıt.json")
const Emoji = require ("../buzz.json")
const data = require("quick.db")
exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(Kayıtvx.KayıtYetkili) && !message.member.roles.cache.has(Kayıtvx.KayıtYetkili2)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.KayıtYetkili2}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    let buzzembed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
    let İsim = args[1]
    let Yaş = args[2]
if(!member) return message.channel.send(buzzembed.setDescription(`Bir Kullanıcı Etiketle Lütfen`)).then(buzz => buzz.delete({timeout:5000}))
if(!İsim) return message.channel.send(buzzembed.setDescription(`Kayıt Olacak Kullanıcının **İsmini Yazınız**`)).then(buzz => buzz.delete({timeout:5000}))
if(!Yaş) return message.channel.send(buzzembed.setDescription(`Kayıt Olacak Kullanıcının **Yaşını Yazınız**`)).then(buzz => buzz.delete({timeout:5000}))
if(isim.lenght > 28) return message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcının İsmi 28 Kelimeyi Geçemez`)).then(buzz => buzz.delete({timeout:5000}))
if(member.roles.cache.has(Kayıtvx.ErkekRol)) return message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcı Zaten **Erkek** Olarak Kayıt Olmus`)).then(buzz => buzz.delete({timeout:5000}))
///////////////////////////////////////////////////////////////////////////////////
let KayıtSayısı = await data.fetch(`kayıtVeri_${message.author.id}`)
if(!KayıtSayısı) KayıtSayısı = "0"
data.add(`kayıtVeri_${message.author.id}`,1)
///////////////////////////////////////////////
member.setNickname(`${member.user.username.includes(Kayıtvx.tag) ? Kayıtvx.tag : Kayıtvx.untag} ${İsim} | ${Yaş}`).catch()
if(member.roles.cache.has(Kayıtvx.BoosterİD)){
member.roles.set([Kayıtvx.ErkekRol, Kayıtvx.ErkekRol2, Kayıtvx.ErkekRol3, Kayıtvx.BoosterİD]).catch()
}else{
member.roles.set([Kayıtvx.ErkekRol, Kayıtvx.ErkekRol2, Kayıtvx.ErkekRol3]).catch()
}
if(member.user.username.includes(Kayıtvx.tag)) member.roles.add(Kayıtvx.EkipRolü).catch()
/////////////////////////////////////////////
message.react(Emoji.OnaylıEmoji)
///////////////////////////////////////
message.channel.send(buzzembed.setDescription(`${member}, AdlI Kullanıcıyı <@&${Kayıtvx.ErkekRol}> Olarak Kayıt Etdim`).setFooter(`Toplam Kayıtınız: ${KayıtSayısı}`))
if(Kayıtvx.GenelChat) return message.channel.send(buzzembed.setDescription(`${member}, Adlı Kullanıcı Aramıza Katıldı Toplam **${message.guild.memberCount}** Kişiye Ulaştık`).setFooter(`Kayıt Eden Yetkili: ${message.author.tag, message.author.avatarURL()}`)).then(buzz => buzz.delete({timeout:6000}))

}
exports.conf = {
    command: "e",
    description: "Kullanıcıyı Erkek Olarak Kayıt Eder",
    aliases: ["erkek","man","Erkek"]
  }