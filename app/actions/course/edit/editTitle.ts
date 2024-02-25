"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const editTitle = async(title : string,id : string ) =>{
    const course = await db.courses.update({
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
    return course.title;
    

}