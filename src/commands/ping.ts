import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interation: CommandInteraction){
        await interation.reply('Pong!');
    },
}

