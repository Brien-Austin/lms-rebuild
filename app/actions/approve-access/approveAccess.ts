
"use server";

import { db } from "@/lib/db";

export const approveAccess = async (courseId: string | null, userId: string | null) => {

  if ( typeof userId === "string" && typeof courseId === "string") {

    const approve = await db.requestAcess.update({
      where : {
        userId
      },
      data : {
        courseAccess : {
          update : {
            isGivenAccess : true,
            isRequesting : true,
          }
        }
      },include : {
        courseAccess : true
      }
    })
    


    const purchase = await db.purchase.create({
      data : {
        courseId ,
        userId,
        isGivenAccess : true,
    }
    })

    return approve.courseAccess?.isGivenAccess;
  
  
}
};
