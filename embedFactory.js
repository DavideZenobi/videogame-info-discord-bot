import { EmbedBuilder } from "discord.js";

export function createEmbedForGame(data) {

    const params = {
        name: data.name,
        description: newDescription,
        image: data.background_image,
        thumbnail: data.background_image,
        release_date: data.released,
        developers: developersString,
    }
    
    const newEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(params.name)
        .setDescription(params.description)
        .setImage(params.image)
        .setThumbnail(params.thumbnail)
        .setTimestamp()
        .addFields(
            { name: "Release date", value: `:calendar_spiral: ${params.release_date}` },
            { name: "Developer", value: params.developers},
        )
    return newEmbed;
}

export function createEmbedForDeveloper() {
    const newEmbed = new EmbedBuilder()

    return newEmbed;
}