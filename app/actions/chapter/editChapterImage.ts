"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editChapterImage = async(imageUrl : string,id : string ) =>{
    const chapters = await db.chapters.update({
       where : {
        id : id,
       },
       data : {
        imageUrl : {
            set : imageUrl
        }
       }
       

    })
    revalidatePath('/')
    return chapters.imageUrl;
    

}