'use server'

import { db } from "@/lib/db"

export const isAlreadyRequested = async(courseId : string , userId : string) =>{

    const isRequested = await db.requestAcess.findFirst({
        where : {
            userId : userId,
            courseAccess : {
                courseId : courseId
            }
        }
    })

    if(isRequested){
        return true;

    }

    return false;

}