import { SlashCommandBuilder } from 'discord.js';
import { getGamesByString } from '../rawg-api.js';


export const data = new SlashCommandBuilder()
    .setName("game")
    .setDescription("Provides information about the game")
    .addStringOption(option => option.setName('game-name')
        .setDescription('Input for game search autocomplete')
        .setRequired(true)
        .setAutocomplete(true)
    );
export async function autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const games = await getGamesByString(focusedValue);
    console.log(games);
    await interaction.respond(
        games.map(game => ({ name: game.name, value: game.id.toString() }))
    );
}
export async function execute(interaction) {
    await interaction.reply("That game is awesome!");
}