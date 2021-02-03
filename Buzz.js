const { Client, Collection, Message } = require("discord.js");
const client = global.client = new Client({ fetchAllMembers: true });
const config = require("./config.json");
const fs = require("fs");
const log = require("../loge.json")
client.commands = new Collection();
client.aliases = new Collection();

fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./commands/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Command] ${file.replace(".js", "")} Buzz Commands Dosyaları Yükleniyor`);
    command.conf.aliases.forEach(aliases => {
        client.aliases.set(aliases, command)  
    });
});

fs.readdirSync("./events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "hey Buzz <3 ")}`);
});


  ////Hosgeldın Mesajı\\\\
  //Embedli\\
  client.on('guildMemberAdd' , async member => {
    let kanals = client.channels.cache.get(log.HoşgeldinMesajıLog) 
    let Buzzvx = new Discord.MessageEmbed()
    .setColor("2F3136")
    .setDescription(`
    ${member} \`(${member.id})\` Adlı Kullanıcı Sunucumuza Hoşgeldin Seninle Birlikte \`${member.guild.memberCount}\` Kişiye Ulaştık :tada:
    
    Kaydının Yapılması İçin Sol Taraftaki Ses-Teyit Odalarından Birine Girip Ses Teyit Vermen Yeterli Olacaktır Kayıt Olduktan Sonra Rol Seçim Odalarından Rol Seçmeyi Unutma
    Kayıt Olan Herkes Kuralları Okunmuş Olarak Kayıt Olur İyi Eğlenceler :tada: :tada: :tada: 
    
    `)
    
  kanals.send(Buzzvx)
  
  })
  //
  ///Embedsiz Welcome Mesajı\\\\\\\\\
  client.on('guildMemberAdd' , async member => {
    let kanals = client.channels.cache.get(log.HoşgeldinMesajıLog) 
  kanals.send(`${member} \`(${member.id})\` Adlı Kullanıcı Sunucumuza Hoşgeldin Seninle Birlikte \`${member.guild.memberCount}\` Kişiye Ulaştık :tada:
    
  Kaydının Yapılması İçin Sol Taraftaki Ses-Teyit Odalarından Birine Girip Ses Teyit Vermen Yeterli Olacaktır Kayıt Olduktan Sonra Rol Seçim Odalarından Rol Seçmeyi Unutma
  Kayıt Olan Herkes Kuralları Okunmuş Olarak Kayıt Olur İyi Eğlenceler :tada: :tada: :tada: `)
  
  })
client.login(config.Token).then(c => console.log(`Bot Giriş Yaptı ${client.user.tag}!`)).catch(err => console.error(`Bot Giriş Yapamadı Galiba Token Hatalı`));
