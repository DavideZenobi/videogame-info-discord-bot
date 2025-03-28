const fs = 	require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
require('dotenv').config();
// process.env.TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsFolderPath = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsFolderPath).filter(file => file.endsWith('.js'));
	
for (const command of commands) {
	
	const filePath = path.join(commandsFolderPath, command);
	const newCommand = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in newCommand && 'execute' in newCommand) {
		client.commands.set(newCommand.data.name, newCommand);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
		}

	}
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.APPLICATION_TOKEN);