"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const publishChapter = async(id : string ) =>{
    const chapters = await db.chapters.update({
       where : {
        id : id,
       },
       data : {
        isPublished : true
       }
       

    })
    revalidatePath('/')
   
    

}