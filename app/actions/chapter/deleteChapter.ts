"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const deleteChapter = async(id : string ) =>{
    const deletedChapter = await db.chapters.delete({
       where : {
        id : id,
       }
       
       

    })
    revalidatePath('/')
   
    

}