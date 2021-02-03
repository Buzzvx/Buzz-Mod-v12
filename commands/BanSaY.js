const Discord = require("discord.js");
const buzz = require("../buzz.json")
exports.execute = async (client, message, args) => {
    if(!message.member.roles.cache.has(buzz.ÜstYetkili) && !message.member.roles.cache.has(buzz.BanHammer)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`Bu Komutu Kullanmak İçin <@&${buzz.BanHammer}> Rolüne Sahip Olmanız Lazım`).setTimestamp()).then(buzz => buzz.delete({timeout: 6000}))
  let guild = message.guild;

  guild
    .fetchBans()
    .then(bans =>
      message.channel.send(
        `Sunucunuzda **(${bans.size})** Banlanmış Üye Bulunmakta`
      )
    )
    .catch(console.error);
};

exports.conf = {
    command: "bansay",
    description: "Sunucuda Kaç Kullanıcı Banlanmış Sayar",
    aliases: ["ban-say","bansay","bannedsay"]
  }
