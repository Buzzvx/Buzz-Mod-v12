const Discord = require("discord.js")
const buzz = require("../buzz.json")
const log = require("../loge.json")
const moment = require("moment")

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.BanHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
let member = message.mentions.users.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ") || "Sebep belirtilmedi";
let BuzzEmbed = new Discord.MessageEmbed().setColor("AQUA").setAuthor(message.author.tag, message.author.avatarURL()).setTimestamp()
if(!member) return message.channel.send(BuzzEmbed.setDescription(`Bir Kullanıcı Etiketlemeniz Lazım **@Üye/İD**`))
if (member.id === message.author.id) return message.channel.send(BuzzEmbed.setDescription(`**Kendini Banlıyamazsın**`)).then(buzz => buzz.delete({timeout:5000})) 
if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(BuzzEmbed.setDescription(`Etiketlediğiniz Kullanıcı Sizinle Aynı **Rolde** Veya Sizden **Yüksek** Rolde`)).then(buzz => buzz.delete({timeout:5000}))
////////////////
let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter('Aether & Serendia').setColor("RANDOM").setTimestamp();
if (!message.member.roles.cache.has(ayar.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));

/////////////////////
moment.locale("tr");
member.ban()
message.react(buzz.OnaylıEmoji)
////////////////////
message.channel.send(BuzzEmbed.setDescription(`${member}, Adlı Kullanıcı ${message.author} Adlı Yetkili Tarafından **${sebep}** Sebepten Dolayı Sunucudan Yasaklandı`)).then(buzz => buzz.delete({timeout:8000})) 
message.guild.channels.cache.get(log.BanLog).send(BuzzEmbed.setDescription(`
${member} \`(${member.id})\` **Adlı Kullanıcı Sunucudan Yasaklandı**

• Yetkili: ${message.author} \`(${message.author.id})\`
• Banned Tarih: **${moment(Date.now()).format("Do MMMM YYYY dddd HH:mm:ss")}**

• Sebep: ${sebep}

`))

}
exports.conf = {
    command: "ban",
    description: "Sunucudan Kullanıcıyı Banlar",
    aliases: ["banned","ban","yasakla"]
  }
  