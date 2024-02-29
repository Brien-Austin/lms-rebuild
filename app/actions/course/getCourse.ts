'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const getOwnedCourse = async(id : string | null) =>{

    if(typeof id === 'string'){
        const course = await db.courses.findUnique({
            where : {
                id : id
            },
            include : {
                chapter : true
            }
        })
        revalidatePath('/')
    
        return course ;
    }

}