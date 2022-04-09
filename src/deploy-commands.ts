import dotenv from "dotenv";
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';
import * as fs from 'fs';
import path from "path";


dotenv.config({path:__dirname + './../.env'});
const commands: any = [];

let path1 = path.resolve(__dirname, './commands');

const commandFiles = fs.readdirSync(path1).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`${path1}/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '9'}).setToken((process.env.TOKEN as string));

rest.put(Routes.applicationGuildCommands((process.env.APP_ID as string), (process.env.GUILD_ID as string)), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
