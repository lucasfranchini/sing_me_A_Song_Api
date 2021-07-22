import faker from "faker";
import connection from "../../src/database";

export function generateRecommendation( name:string, link:string ){
    const data = {
        name: name || faker.name.title(),
        youtubeLink: link || "https://www.youtube.com/watch?v=P7jwLxkN8gI"
    }
    return data;
}

export async function saveRecommendationInDatabase(){
    const data = generateRecommendation('','');
    const res = await connection.query(`
    INSERT 
    INTO recommendations 
    (name,"youtubeLink") 
    VALUES ($1,$2)
    RETURNING *
    `,[data.name,data.youtubeLink]);
    return res.rows[0];
}