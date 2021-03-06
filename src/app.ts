import dotenv from "dotenv";
import express from "express";
import { Client, Intents, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import * as fs from 'fs';
import path from "path";


const app = express();

dotenv.config({path:__dirname + './../.env'});
let path1 = path.resolve(__dirname, './commands');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
export var commands = new Collection<any,any>();

const commandFiles = fs.readdirSync(path1).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`${path1}/${file}`);
    commands.set(command.data.name, command);
}

client.once('ready', ()=>{
    console.log(`Logged in as ${client.user?.tag}.`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login((process.env.TOKEN as string));




