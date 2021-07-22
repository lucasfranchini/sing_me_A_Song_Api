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

export async function randomRecommendation(){
    
}