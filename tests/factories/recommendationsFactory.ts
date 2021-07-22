import faker from "faker";
import connection from "../../src/database";

export async function CreateRecommendation(){
    const data = {
        name: faker.name.title(),
        link: "https://www.youtube.com/watch?v=P7jwLxkN8gI"
    }

    const result = await connection.query(`
    INSERT INTO recommendations
    (name,link)
    VALUES ($1,$2)
    RETURNING *
    `,[data.name,data.link])

    return result.rows[0];
}