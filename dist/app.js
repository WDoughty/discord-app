"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const app = (0, express_1.default)();
dotenv_1.default.config();
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
const rest = new rest_1.REST({ version: '9' }).setToken(process.env.TOKEN);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(v9_1.Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}))();
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.on('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}.`);
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'test') {
        yield sendMessage('Testing bot reply', interaction);
    }
    if (interaction.commandName === 'user') {
        yield sendMessage(`Username :${interaction.user.username}`, interaction);
    }
    if (interaction.commandName === 'dmme') {
        yield sendMessageToUser(`${interaction.user.username}`, interaction);
    }
}));
function sendMessage(message, interaction) {
    interaction.reply(message);
}
function sendMessageToUser(message, interaction) {
    interaction.user.createDM().then(result => {
        result.send(message);
    }).catch(err => console.log(err));
}
client.login(process.env.TOKEN);
//# sourceMappingURL=app.js.map