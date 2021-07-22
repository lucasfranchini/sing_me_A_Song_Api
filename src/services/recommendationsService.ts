import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function addMusic(name:string,link:string):Promise<boolean>{
    const duplicate = await recommendationsRepository.verifyLinkDuplication(link);
    if(duplicate) return false;
    await recommendationsRepository.addMusic(name,link);
    return true;
}

export async function changeScore(id:number,type:string):Promise<boolean>{
    const recommendation = await recommendationsRepository.findRecommendationById(id);
    if(!recommendation) return false;
    if(type==='up'){
        recommendation.score++;
        await recommendationsRepository.changeScore(id,recommendation.score)
    }
    else if(type==='down'){
        recommendation.score--;
        if(recommendation.score<-5) await recommendationsRepository.removeRecommendationById(id);
        else await recommendationsRepository.changeScore(id,recommendation.score)
    }
    return true;
}

export async function randomRecommendation():Promise<{id:number;name:string;youtubeLink:string;score:number}>{
    let result:{id:number;name:string;youtubeLink:string;score:number}[];

    if(Math.random() < 0.7) result = await recommendationsRepository.listRecommendationsByScore('>');
    else result = await recommendationsRepository.listRecommendationsByScore('<');

    if(result.length===0) result = await recommendationsRepository.listAllRecommendations();
    if(result.length===0) return null;

    const random = Math.floor(Math.random()*result.length);
    return result[random];
}

export async function topRecommendations( amount:number):Promise<{id:number;name:string;youtubeLink:string;score:number}[]>{
    const result = await recommendationsRepository.listLimitedRecommendations(amount);
    return result;
}