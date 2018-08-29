const Discord = require("discord.js");
const ms = require("ms");

var prefix = ("!")

module.exports.run = async (bot, message, args) =>{

    // /tempmute @user 10s insulte

    let tomute = message.guild.members(message.mentions.user.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Impossible de trouver l'utilisateur");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je n'ai pas la permission MANAGE_MESSAGES pour faire ceci.");
    let muterole = message.guild.roles.find("name", "Mute");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permission: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime){
        await(tomute.addRole(muterole.id));
        message.guild.channels.find("name", "Sanction").send(`<@${tome.id}> a bien été mute indéfiniment jusqu'a a être démuter)}`);
        message.guild.channels.find("name", "Général").send(`<@${tome.id}> a été mute indéfiniment jusqu'a a être démuter)}`);
    }

    if(mutetime){
        await(tomute.addRole(muterole.id));
        message.guild.channels.find("name", "Sanction").send(`<@${tome.id}> a bien été mute pendant ${ms(ms(mutetime))}`);
        message.guild.channels.find("name", "Général").send(`<@${tome.id}> a été mute pendant ${ms(ms(mutetime))}`);

        setTimeout(function(){
            tomute.removeRole(muterole.id);
            message.guild.channels.find("name", "Général").send(`<@${tome.id}> a été démuter)}`);
        }, ms(mutetime));
    }
}

bot.on('message', message =>{
    if(command === "demute"){
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à démuter.");
        }
        if(message.mentions.users.size === 0) {
            tomute.removeRole(muterole.id);
            message.guild.channels.find("name", "Général").send(`<@${tome.id}> a été démuter)}`);
        }
    }
});
