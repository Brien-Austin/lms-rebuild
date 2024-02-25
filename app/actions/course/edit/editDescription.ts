"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editDescription = async(description : string,id : string ) =>{
    const course = await db.courses.update({
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
    return course.description;
    

}