"use server"

import { db } from "@/lib/db"

export const notApproved = async() =>{
    try {
        const notApproved = await db.requestAcess.findMany({
            where : {
                courseAccess : {
                    isGivenAccess : false
                }
            }
        })

        return notApproved;

        
    } catch (error) {
        console.log('[APPROVED COURSES ERROR]', error)
        
    }
}