import * as recommendationsRepository from "../repositories/recommendationsRepository";

export async function addMusic(name:string,link:string):Promise<boolean>{
    const duplicate = recommendationsRepository.verifyLinkDuplication(link);
    if(duplicate) return false;
    await recommendationsRepository.addMusic(name,link);
    return true;
}