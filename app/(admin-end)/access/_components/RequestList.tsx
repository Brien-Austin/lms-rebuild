import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import React from 'react'
interface RequestListProps{
    id : string | null 
    email : string | null
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
const RequestList = ( {id,email,courseName} : RequestListProps) => {
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
        <div className={'xs bg-gradient-to-r from-indigo-500 to-indigo-600 shadow cursor-pointer p-2 text-white text-xs rounded '}>
            Approve
        </div>
        </div>
    </div>
  )
}

export default RequestList