"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editChapterTitle = async(title : string,id : string ) =>{
    const chapters = await db.chapters.update({
       where : {
        id : id,
       },
       data : {
        title : {
            set : title
        }
       }
       

    })
    revalidatePath('/')
    return chapters.title;
    

}