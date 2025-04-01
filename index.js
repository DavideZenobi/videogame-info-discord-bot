import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client, Events, GatewayIntentBits, Collection, MessageFlags } from 'discord.js';
import "dotenv/config";
// process.env.TOKEN

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsFolderPath = join(__dirname, 'commands');
const commands = readdirSync(commandsFolderPath).filter(file => file.endsWith('.js'));
	
for (const command of commands) {
	
	const filePath = join(commandsFolderPath, command);
	const newCommand = await import(`file://${filePath}`);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in newCommand && 'execute' in newCommand) {
		client.commands.set(newCommand.data.name, newCommand);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
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
	} else if (interaction.isAutocomplete()) {
		const command = interaction.client.commands.get(interaction.commandName);
        if (!command || !command.autocomplete) return;

        try {
            console.log(`[AUTOCOMPLETE] Ejecutando para ${interaction.commandName}`);
            await command.autocomplete(interaction);
        } catch (error) {
            console.error(`[AUTOCOMPLETE ERROR] ${error}`);
        }
	}

	
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.APPLICATION_TOKEN);