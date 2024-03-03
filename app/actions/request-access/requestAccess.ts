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

    const existingAccess = await db.requestAcess.findUnique({
        where : {
            userId,
            
        },
        
        include : {
            courseAccess : true
        }
    });
    

    if (existingAccess) {
        const requestAccess = await db.requestAcess.update({
          where: {
            userId,
          },
          data: {
            courseAccess: {
              create: {
                courseId,
              },
            },
          },
          include: {
            courseAccess: true,
          },
        });
        return requestAccess.courseAccess;
      }
      
 const requestAccess = await db.requestAcess.create({
  
    data: {
        userId,
        firstName,
        emailAddress,
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
    

    return requestAccess.courseAccess;
    
   } catch (error) {
    console.log('REQUEST ERROR',error);
    return new NextResponse('Error: ' ,{status : 400})
    
   }
};
