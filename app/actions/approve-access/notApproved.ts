"use server"

import { db } from "@/lib/db"

export const notApproved = async (courseId: string, userId: string) => {
    try {
        const notApproved = await db.requestAcess.findUnique({
            where: {
                userId,
                courseAccess: {
                    courseId,
                    isRequesting: true
                }
            },
            include : {
                courseAccess : true
            }
        });

        console.log('[notApproved Result]:', notApproved);

        if (notApproved) {
            return notApproved.courseAccess?.isRequesting;
        }

        else {
            return false;
        }
    } catch (error) {
        console.log('[APPROVED COURSES ERROR]', error);
        throw error; 
};
}