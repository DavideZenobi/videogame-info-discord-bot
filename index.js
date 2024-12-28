const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
// process.env.TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);