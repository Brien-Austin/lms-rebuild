"use server"

import { db } from "@/lib/db"

export const userHaveAccess = async(courseId : string , userId : string | null | undefined) =>{

   if(typeof userId === "string"){
    const purchased = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: userId,
            courseId,
          },
        },
      });
    

    if(purchased){
        return true;
    }
    return false;
   }


   

}
export const isProcessing = async(courseId : string , userId : string) =>{

  if(typeof userId === "string"){
    const purchased = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: userId,
            courseId:courseId ,
          },
        },
      });
    

    if(purchased){
        return true;
    }
    return false;
   }


    

   

}