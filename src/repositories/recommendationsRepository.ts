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
