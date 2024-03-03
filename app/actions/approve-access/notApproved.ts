"use server"

import { db } from "@/lib/db"

export const notApproved = async(courseId: string , userId : string) =>{
    try {
        const notApproved = await db.requestAcess.findUnique({
            where : {
                userId,
                
                
                courseAccess : {
                    courseId,
                    isRequesting : true,
                }
            }
        })
        if(notApproved){
            return true;
        }
        return false;

        

        
    } catch (error) {
        console.log('[APPROVED COURSES ERROR]', error)
        
    }
}