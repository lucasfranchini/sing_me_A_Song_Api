import connection from "../database";

export async function addMusic(name:string,link:string){
    await connection.query(`
    INSERT 
    INTO recommendations 
    (name,"youtubeLink") 
    VALUES ($1,$2)
    `,[name,link]);
}

export async function verifyLinkDuplication(url:string):Promise<boolean>{
    const result = await connection.query(`
    SELECT * 
    FROM recommendations
    WHERE "youtubeLink" = $1
    `,[url]);
    if(result.rowCount>0) return true;
    else return false
}

export async function findRecommendationById(id:number):Promise<{id:number;name:string;youtubeLink:string;score:number}>{
    const result = await connection.query(`
    SELECT * 
    FROM recommendations
    WHERE id = $1
    `,[id]);
    return result.rows[0];
}

export async function changeScore(id:number,score:number){
    await connection.query(`
    UPDATE recommendations
    SET score=$1
    WHERE id=$2
    `,[score,id]);
}

export async function listRecommendationsByScore(comparator:string):Promise<{id:number;name:string;youtubeLink:string;score:number}[]>{
    const result = await connection.query(`
    SELECT * 
    FROM recommendations
    WHERE score ${comparator} 10
    ORDER BY score
    `);
    return result.rows;
}

export async function listAllRecommendations():Promise<{id:number;name:string;youtubeLink:string;score:number}[]>{
    const result = await connection.query(`
    SELECT * 
    FROM recommendations
    ORDER BY score DESC
    `);
    return result.rows;
}

export async function listLimitedRecommendations(amount:number):Promise<{id:number;name:string;youtubeLink:string;score:number}[]>{
    const result = await connection.query(`
    SELECT * 
    FROM recommendations
    ORDER BY score DESC
    LIMIT $1
    `,[amount]);
    return result.rows;
}

export async function removeRecommendationById(id:number){
    await connection.query(`
    DELETE FROM recommendations
    WHERE id=$1
    `,[id]);
}