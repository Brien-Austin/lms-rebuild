"use server"

import { db } from "@/lib/db"

export const userHaveAccess = async(courseId : string , userId : string) =>{

    const hasAccess = await db.requestAcess.findUnique({
        where: {
            userId :userId,
            courseAccess :{
                courseId :courseId
            }
            
        
        },
        include : {
            courseAccess : true
        }
       
      
        
    })

    return hasAccess?.courseAccess?.isGivenAccess;


   

}
export const isProcessing = async(courseId : string , userId : string) =>{

    const hasAccess = await db.requestAcess.findUnique({
        where: {
            userId :userId,
            courseAccess :{
                courseId :courseId
            }
            
        
        },
        include : {
            courseAccess : true
        }
       
      
        
    })

    return hasAccess?.courseAccess?.isRequesting;
    

   

}