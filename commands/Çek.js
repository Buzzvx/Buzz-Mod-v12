const Discord = require("discord.js")
const buzz = require("../buzz.json")

exports.execute = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("Bir ses kanalında olman gerek")
    let Gullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!Gullanici) return message.channel.send("Kullanıcı belirtmedin")
    if (message.member.voice.channel === Gullanici.voice.channel) return message.channel.send("Zaten aynı kanaldasınız")
    const filter = (reaction, user) => {
        return [buzz.OnaylıEmoji, buzz.OnaysızEmoji].includes(reaction.emoji.id) && user.id === Gullanici.id;
    };
    let BuzzCode = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(`${Gullanici},, ${message.author} **Adlı Kullanıcı Sizi Odasına Çekmek İstiyor Kabul Ediyormusunuz** `)
        
    let BuzzReaction = await message.channel.send(BuzzCode)
    await BuzzReaction.react(buzz.OnaylıEmoji)
    await BuzzReaction.react(buzz.OnaysızEmoji)
    BuzzReaction.awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
    }).then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.id === buzz.OnaylıEmoji) {
            let buzz = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${Gullanici} Başarılı Bir Şekilde Ses Odasına Çekildi`)
            message.channel.send(buzz)
            Gullanici.voice.setChannel(message.member.voice.channel)
            BuzzReaction.delete()
        } else {
            let BuzzVx = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`${Gullanici} Odaya Çekmeyi Kabull Etmedi`)
            message.channel.send(BuzzVx)
            BuzzReaction.delete()
        }
    })
}

exports.conf = {
    command: "çek",
    description: "İstediğiniz Kullanıcıyı İzinli Yanınıza Çeker",
    aliases: ["çek","cek","izinliçek"]
  }
  

