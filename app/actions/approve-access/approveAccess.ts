"use server"

import { db } from "@/lib/db"

export const approveAccess = async (courseId : string | null , userId : string | null)=>{

    if(typeof courseId === "string" && typeof userId === "string"){
        const approved = await db.requestAcess.update({
            where : {
                userId : userId,
                courseAccess :{
                    courseId : courseId ,
                    
                }
            },
            data : {
                courseAccess : {
                    update : {
                        isGivenAccess : true,
                    }
                }
            }
        })

        const purchase = await db.purchase.create({
            data : {
                userId,
                courseId : courseId
            }
        })
        if(approved) {
            return true;
        }
        return false;
    
    }
    
   


}