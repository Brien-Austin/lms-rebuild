"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editChapterYTUrl = async(youtubeUrl : string,id : string ) =>{
    const chapters = await db.chapters.update({
       where : {
        id : id,
       },
       data : {
        youtubeUrl : {
            set : youtubeUrl
        }
       }
       

    })
    revalidatePath('/')
    return chapters.youtubeUrl;
    

}