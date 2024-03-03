"use server";

import { db } from "@/lib/db";

export const approveAccess = async (courseId: string | null, userId: string | null) => {

  if ( typeof userId === "string" && typeof courseId === "string") {
    const purchase = await db.purchase.create({
      data : {
        courseId ,
        userId
    }
    })

    return purchase;
  
  
}
};
