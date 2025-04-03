import { SlashCommandBuilder } from 'discord.js';
import { getGame, getGamesByString } from '../rawg-api.js';
import { createEmbedForGame } from '../embedFactory.js';


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
            // Existe el campo developers pero está vacío en la mayoría de juegos
            //const developers = game.developers?.map(dev => dev.name).join(", ") || "Desconocido";
            
            return {
                name: `${game.name} (${year})`,
                value: game.id.toString()
            }; 
        })
    );
}
export async function execute(interaction) {
    const gameName = interaction.options.getString("game-name");

    const game = await getGame(gameName);
    console.log(game);
    const embed = createEmbedForGame();

    await interaction.reply({ embeds: [embed] });
}