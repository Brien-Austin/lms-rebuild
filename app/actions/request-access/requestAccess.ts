"use server"
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
export const getCourseAccess = async (
    firstName: string,
    courseId: string,
    userId: string,
    emailAddress: string
) => {
   try {
    

    const requestAccess = await db.requestAcess.update({
        where : {
            userId,
            
        },
        data: {
            courseAccess : {
                create : {
                    courseId
                }
            }
        },
        include : {
            courseAccess : true
        }
    });
    console.log(requestAccess.courseAccess)

    return requestAccess.courseAccess;
    
   } catch (error) {
    console.log('REQUEST ERROR',error);
    return new NextResponse('Error: ' ,{status : 400})
    
   }
};
