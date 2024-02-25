"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editImage = async(imageUrl : string,id : string ) =>{
    const course = await db.courses.update({
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
  
    

}