const Discord = require('discord.js');
const buzz = require('../buzz.json');
const Prefix = require("../config.json")
exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.BanHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
    let BuzzEmbed = new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
  if(!args[0] || isNaN(args[0])) return message.channel.send(BuzzEmbed.setDescription(`Bir Kullanıcı Etiketlemelisiniz @Üye/İD`)).then(buzz => buzz.delete({timeout:6000}))
  try {
    message.guild.fetchBan(args.slice(0).join(' '))
    .then(({ user, reason }) => message.channel.send(BuzzEmbed.addField('Banlanan Kullanıcı', `${user.tag} \`(${user.id})\``).setDescription(`**Ban Sebebi:** ${reason || "Sebep Yazılmamış"} `)))
  } catch(err) { message.reply('**Belirtilen ID numarasına sahip banlanmış kullanıcı bulamadım veya bir sorun oluştu!**') }
};

exports.conf = {
    command: "banbilgi",
    description: "Sunucudan Kullanıcıyı Banlar",
    aliases: ["banbilgi","ban-bilgi","baninfo"]
  }
  