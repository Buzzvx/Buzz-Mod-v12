const Discord = require("discord.js");
const client = global.client;
const buzz = require("../buzz.json")
exports.execute = async () => {
    client.user.setPresence({ activity: { name: buzz.BotDurum}, status: buzz.BotStatus });
};

exports.conf = {
  event: "ready"
};

//Status//--// Online- Çevrim İçi// * - //dnd- Çevrimdışı //*//idle Boşta//*//invisible Çevrim Dışı//* Buzz Sevgiler Saygılar ♣