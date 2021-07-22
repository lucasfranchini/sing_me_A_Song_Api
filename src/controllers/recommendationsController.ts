import {Request,Response} from "express";
import * as recommendationsService from "../services/recommendationsService";

export async function addMusic(req:Request,res:Response){
    try{
        const {name,youtubeLink} = req.body;
        if(!name || !validateYouTubeUrl(youtubeLink)) return res.sendStatus(400)
        const result = await recommendationsService.addMusic(name,youtubeLink);
        if(!result) return res.sendStatus(409)
        res.sendStatus(201)
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function addScore(req:Request,res:Response){
    try{
        const id = Number(req.params.id);
        const result = await recommendationsService.changeScore(id,"up")
        if(!result) return res.sendStatus(404);
        res.sendStatus(200)
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }  
}

export async function subtractScore(req:Request,res:Response){
    try{
        const id = Number(req.params.id);
        const result = await recommendationsService.changeScore(id,"down")
        if(!result) return res.sendStatus(404);
        res.sendStatus(200)
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }  
}

export async function randomRecommendation(req:Request,res:Response){
    const result = await recommendationsService.randomRecommendation();
    if(result===null) return res.sendStatus(404);
    res.send(result)
}

function validateYouTubeUrl(url:string)
{
    const regExp = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    const test = regExp.test(url);
    if (test ) {
        return true;
    }
    else {
       return false
    }
}