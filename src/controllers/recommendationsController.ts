import {Request,Response} from "express";

export async function addMusic(req:Request,res:Response){
    const {name,youtubeLink} = req.body
    if(!name || validateYouTubeUrl(youtubeLink)) return res.sendStatus(400)
}

function validateYouTubeUrl(url:string)
{
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return true;
    }
    else {
       return false
    }
}