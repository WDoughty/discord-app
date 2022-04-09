import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Sends you a DM!'),
    async execute(interation: CommandInteraction){
        await interation.user.createDM().then(result =>{
            result.send(`Hi ${interation.user.username}.`);
        }).catch(err => console.log(err));
    },
}