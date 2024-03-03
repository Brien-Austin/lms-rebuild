"use server"

import { db } from "@/lib/db"

export const deleteRequest = async (reqId : string | null)=>{

  if (typeof reqId === "string"){
    const deleteRequest = await db.requestAcess.delete({
        where : {
            id : reqId
        }
       })
  }
}