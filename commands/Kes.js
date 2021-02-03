const Discord = require('discord.js');
const buzz = require('../buzz.json');

exports.execute = async(client, message, args) => {
if (!message.guild) {return}
if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.BanHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  if(!member) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Bir Kullanıcı Etiketleyin`)).then(buzz => buzz.delete({timeout:8000}));
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizlen **Eşit** Veya Sizden Daha **Yüksek** Roldesiniz`).then(buzz => buzz.delete({timeout:8000}));
  message.guild.member(member.id).voice.setChannel(null)
 message.react(buzz.OnaylıEmoji)
 let BuzzVx = new Discord.MessageEmbed() 
 .setColor("RANDOM")
 .setAuthor(message.author.tag, message.author.avatarURL())
 .setDescription( `${member} Adlı Kullanıcının Ses Kanalında Bağlantısı Kestim `)
 
   message.channel.send(BuzzVx).then(buzz => buzz.delete({timeout:8000}));
}
exports.conf = {
    command: "kes",
    description: "İstediğiniz Kullanıcının Sesde Bağlantısını Kesersiniz",
    aliases: ["kes","seskes","bağlantıkessss"]
  }