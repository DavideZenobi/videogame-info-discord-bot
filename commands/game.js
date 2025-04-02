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
    if (focusedValue.length < 3) {
        return interaction.respond([]);
    }

    const games = await getGamesByString(focusedValue);
    await interaction.respond(
        games.map(game => { 
            const year = game.released?.split("-")[0] || "N/A";
            const developers = game.developers?.map(dev => dev.name).join(", ") || "Desconocido";
            
            return {
                name: `${game.name} (${year}) - ${developers}`,
                value: game.id.toString()
            }; 
        })
    );
}
export async function execute(interaction) {
    await interaction.reply("That game is awesome!");
}