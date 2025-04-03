import { EmbedBuilder } from "discord.js";

export function createEmbedForGame() {
    const newEmbed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("game title")
        .setDescription("description here")
    
    return newEmbed;
}