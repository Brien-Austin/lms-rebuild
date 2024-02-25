"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const publishCourse = async(id : string ) =>{
    const course = await db.courses.update({
       where : {
        id : id,
       },
       data : {
       isPublished : true
       }
       

    })
    revalidatePath('/')
    
    

}