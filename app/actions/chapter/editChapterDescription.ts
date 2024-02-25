"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editChapterDescription = async(description : string,id : string ) =>{
    const chapters = await db.chapters.update({
       where : {
        id : id,
       },
       data : {
        description : {
            set : description
        }
       }
       

    })
    revalidatePath('/')
    return chapters.description;
    

}