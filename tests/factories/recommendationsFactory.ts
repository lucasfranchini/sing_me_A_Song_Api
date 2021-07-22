import faker from "faker";
import connection from "../../src/database";

export async function generateRecommendation( name:string, link:string ){
    const data = {
        name: name || faker.name.title(),
        youtubeLink: link || "https://www.youtube.com/watch?v=P7jwLxkN8gI"
    }

    return data;
}