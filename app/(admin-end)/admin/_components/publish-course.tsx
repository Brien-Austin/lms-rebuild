"use client"
import { publishCourse } from '@/app/actions/course/publish/publish-course';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

interface PublishCourseProps {
    isPublished : boolean | undefined
    isCompleted : boolean | undefined
    id :string;
}
const PublishCourse = ({id,isCompleted,isPublished} : PublishCourseProps) => {
    const router = useRouter();
    const handleCoursePublish = async() =>{
       try {
        await publishCourse(id)
        
        

        toast.success('Course published successfully')
        router.refresh();
        
       } catch (error) {
        toast.error('Something went wrong')
        
       }

    }
    console.log(isPublished)
  
  return (
 
    <>
    {
            !isPublished ? 
            (
              <>
              <Button onClick={handleCoursePublish} disabled={!isCompleted} variant={'lmsbtn'}>
            Publish
          </Button>
          </>
            ) : (
              <>
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded shadow-sm text-white p-2 text-xs">
                Published
              </div>
              </>
            )
          }</>
  )
}

export default PublishCourse