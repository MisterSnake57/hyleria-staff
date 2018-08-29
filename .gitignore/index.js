const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
let cooldown = new Set();
let cdseconds = 5;

var prefix = ("!")

bot.on('ready', function() {
    bot.user.setGame("Command: *help");
    console.log("Connectedç");
});

bot.login(token);

bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("Liste des commandes: \, -!help, kick, ban, mute");
    }
}); 


bot.on('message', message =>{
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if(command === "kick") {
        let modRole = message.guild.roles.find("name", "Kick");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expluser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expluser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reoply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(message => {
            return message.reply(`${member.user.username} a été explusé avec succès.`).catch(console.error);
        }).catch(console.error)
    }

});

bot.on('message', message =>{
    if(command === "tempmute"){
        console.log(message.author.id);
        var tempmute = require("./tempmute.js")
    }
});

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "bienvenue-aurevoir").send(`Bienvenue ${member}, dans le serveur Hyleria Mᴜʟᴛɪ﹣Gᴀᴍɪɴɢ`);
});

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "bienvenue-aurevoir").send(`${member} vien de nous quitter`);
});

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "welcome-goodbye").send(`Welcome ${member}, in the server Hyleria Mᴜʟᴛɪ﹣Gᴀᴍɪɴɢ`);
});

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "welcome-goodbye").send(`${member}, just leave us`);
});

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.find('name', '.');
    member.addRole(role);
});

bot.on("guildMemberAdd", member => {
    var roles = member.guild.roles.find('name', '👤 → Member');
    member.addRole(roles);
});  
