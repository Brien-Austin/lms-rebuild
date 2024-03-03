import { approveAccess } from '@/app/actions/approve-access/approveAccess';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import React from 'react'
import ApproveCourse from './ApproveCourse';
interface RequestListProps{
  reqId : string | null 
    id : string | null 
    email : string | null
    userId: string | null
    courseId: string | null
    courseName : string | null | undefined



}
const getCourseName = async (id: string) => {
  
    const course = await db.courses.findUnique({
      where: {
        id: id,
      },
    });
    return course?.title;
  };
const RequestList = ( {id,email,courseName,userId,courseId,reqId} : RequestListProps) => {
  
  return (
    <div>
        <div className="flex border rounded p-2 justify-between items-center">
        <div key={id} className=' rounded w-full  flex flex-col  gap-1 p-2'>
          <h1 className='text-xs'>{email}</h1>

          
            {
                typeof courseName === 'string' && (
                    <>
                    
                    <h1 className='text-sm font-medium'>{getCourseName(courseName)}</h1>
                    </>
                )
            }

        </div>
        <ApproveCourse reqId={reqId} courseId= { courseId} userId= { userId } />
       
        </div>
    </div>
  )
}

export default RequestList