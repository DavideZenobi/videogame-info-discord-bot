import { REST, Routes } from 'discord.js';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const newCommands = [];
// Grab all the command folders from the commands directory you created earlier
const commandsFolderPath = join(__dirname, 'commands');
const commands = readdirSync(commandsFolderPath).filter(file => file.endsWith('.js'));

for (const commandString of commands) {
	const filePath = join(commandsFolderPath, commandString);
	const command = await import(`file://${filePath}`);
	if ('data' in command && 'execute' in command) {
		newCommands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.APPLICATION_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${newCommands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			//Routes.applicationCommands(process.env.APPLICATION_ID),
            Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.TEST_GUILD_ID),
			{ body: newCommands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();