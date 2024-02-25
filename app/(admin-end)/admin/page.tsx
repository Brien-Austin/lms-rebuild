import { Button } from '@/components/ui/button';
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'
import SimpleDragAndDrop from './_components/drag-and-drop';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CourseTitle from './_components/course-title-form';
import CreatedCourses from './_components/courses-created';



const Admin = async() => {
    const items= [
        'one', 'two', 'three', 'four', 'five', 'six'
    ]

    const courses = await db.courses.findMany();
    const user = await currentUser();

  return (
   <>
 
    {
        user !== null && user?.firstName !== null  && (
          <div className='flex items-center gap-2 pt-10'>
            <div className="h-8 w-8 relative ">
              <Image className='w-8 h-8 rounded-full' fill src={user?.imageUrl} alt={user?.firstName} />
            </div>
            <h1>{user.firstName}</h1>
          </div>
        )
    }

   {
    courses.length < 1 ? (
        <>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> 
        <h1 className="text-muted-foreground">
            No courses added 
        </h1>
       
        </div>
        <div>
    
        </div>
        <div>
       
            
            
        </div>
     
        <CourseTitle/>
    
       
        </>
    ) : 
    (
        <>
        <div className="mt-5">
        <CourseTitle/>
        </div>
        <div className="flex flex-col gap-10 mt-5 mb-20">
        {
            courses.map((course,index)=>(
               <CreatedCourses key={course.id} 
               title={course.title}
               price={course.price}
               id = {course.id}
               />
            ))
        }
        </div>

        </>
    )
   }
   </>
  )
}

export default Admin