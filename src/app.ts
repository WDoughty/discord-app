import dotenv from "dotenv";
import express from "express";
import discord, { Client, CommandInteraction, Intents, Interaction } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';


const app = express();


dotenv.config();

const commands = [
    {
        name: 'test',
        description: 'Test Reply!'
    },
    {
        name: 'user',
        description: 'Displays user info'
    },
    {
        name: 'dmme',
        description: 'sends a dm'
    }
];

const rest = new REST({version: '9'}).setToken((process.env.TOKEN as string));

(async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(
        Routes.applicationGuildCommands((process.env.APP_ID as string), (process.env.GUILD_ID as string)),
        { body: commands },
      );
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on('ready', ()=>{
    console.log(`Logged in as ${client.user?.tag}.`);
});

client.on('interactionCreate', async interaction=>{
    if(!interaction.isCommand()){
        return;
    }

    if(interaction.commandName === 'test'){
        await sendMessage('Testing bot reply', interaction);
    }

    if(interaction.commandName === 'user'){
        await sendMessage(`Username :${interaction.user.username}`, interaction);
    }

    if(interaction.commandName === 'dmme'){
        await sendMessageToUser(`${interaction.user.username}`, interaction);      
    }
});


function sendMessage(message: string, interaction: CommandInteraction): void {
    interaction.reply(message);
}

function sendMessageToUser(message: string, interaction: CommandInteraction): void {
    interaction.user.createDM().then(result =>{
        result.send(message);
    }).catch(err => console.log(err));
}


client.login((process.env.TOKEN as string));




