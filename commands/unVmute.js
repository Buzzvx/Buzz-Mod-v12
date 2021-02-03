const { MessageEmbed, DiscordAPIError } = require("discord.js")
const data = require("quick.db")
const buzz = require('../buzz.json');
const log = require(`../loge.json`)
const moment = require("moment")
exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.VoiceYetkili)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.VoiceYetkili}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!member)  return message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag,message.author.avatarURL()).setDescription(`**Bir Kullanıcı Belirtmeniz Lazım**\`@Üye / İD\``).setTimestamp())
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag,message.author.avatarURL()).setDescription(`Belirtdiğiniz Kullanıcı Sizinle **Aynı Rolde** Veya Sizden Daha **Yüksek Rolde**`).setTimestamp())
    if(!member.voice.channel) return message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`Etiketlediğiniz Kullanıcı Hiç Bir **Voice** Kanallında Bulunmuyor Bağlandığı Zaman Mutesını Kaldırabilirsiniz`))
    
    if(!member.voice.setMute(true)) return  message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.avatarURL()).setTimestamp().setDescription(`${mention} (\`${mention.id}\`) **Adlı kullanıcı Ses Kanallarında Susturulmamış**`))
    if(member.voice.channel) { 
    data.delete(`MuteCezası.${member.user.id}.${message.guild.id}`) // Bu Kısım Datadan SesMute Cezasını kaldırır
     member.voice.setMute(false);
     const BuzzEmbed = new MessageEmbed()
     .setColor("RANDOM")
     .setAuthor(message.author.tag,message.author.avatarURL())
     .setDescription(`${member} (\`${member.id}\`) **Adlı Kullanıcının Ses-Muted Cezası Kaldırıldı**
     
     • **Ceza-Kaldıran:** <@!${message.author.id}> \`(${message.author.id})\`
     • **Kaldırılma Tarih:** \`(${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")})\` 
     `)
     message.guild.channels.cache.get(log.MuteLog).send(BuzzEmbed)
     message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag,message.author.avatarURL()).setTimestamp().setDescription(`${mention} (\`${mention.id}\`) **Adlı kullanıcının ses kanallarındaki Susturulması** <@!${message.author.id}> **Yetkilisi Tarafından Kaldırıldı**`)).then(buzz => buzz.delete({timeout:5000}))
    }
   
} 

exports.conf = {
    command: "vunmute",
    description: "Kullanıcının Sesdeki Mutesini Kaldırır",
    aliases: ["vunmute","sesmutekaldır","seskaldır","unses","unvmute"]
  }