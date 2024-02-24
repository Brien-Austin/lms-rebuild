"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const createCourse = async(title : string) =>{
    const course = await db.courses.create({
        data : {
            title
        }
       

    })
    revalidatePath('/')
    return course.id;
    

}