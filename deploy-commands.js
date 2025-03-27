const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const newCommands = [];
// Grab all the command folders from the commands directory you created earlier
const commandsFolderPath = path.join(__dirname, 'commands');
const commands = fs.readdirSync(commandsFolderPath).filter(file => file.endsWith('.js'));

for (const commandString of commands) {
	const filePath = path.join(commandsFolderPath, commandString);
	const command = require(filePath);
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