"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editChapterIndex = async(index : number,id : string ) =>{
    const chapters = await db.chapters.update({
       where : {
        id : id,
       },
       data : {
        index : {
            set : index
        }
       }
       

    })
    revalidatePath('/')
    return chapters.index;
    

}