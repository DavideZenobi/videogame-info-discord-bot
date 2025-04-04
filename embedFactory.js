import { EmbedBuilder } from "discord.js";

export function createEmbedForGame(data) {
    let newDescription = data.description.replaceAll("<p>", "");
    newDescription = newDescription.replaceAll("</p>", "");

    let developers = [];
    data.developers.forEach(developer => {
        developers.push(developer.name);
    });

    const developersString = developers.join(", ");

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
            { name: "Release date", value: params.release_date },
            { name: "Developer", value: params.developers},
        )
    return newEmbed;
}

export function createEmbedForDeveloper() {
    const newEmbed = new EmbedBuilder()

    return newEmbed;
}