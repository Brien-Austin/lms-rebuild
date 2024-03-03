"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editCategory = async(category : string,id : string ) =>{
    const course = await db.courses.update({
       where : {
        id : id,
       },
       data : {
        category : {
            set : category
        }
       }
       

    })
    revalidatePath('/')
    return course.title;
    

}