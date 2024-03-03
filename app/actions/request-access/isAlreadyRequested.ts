'use server'

import { db } from "@/lib/db"

export const isAlreadyRequested = async(courseId : string , userId : string) =>{

  
  
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


       
    export const isNotRequested = async(courseId : string , userId : string) =>{

  
  
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


       


