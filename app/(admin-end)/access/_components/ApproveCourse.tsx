"use client"
import { approveAccess } from '@/app/actions/approve-access/approveAccess';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

interface ApproveCourseProps {
    courseId : string | null
    userId : string | null
}
const ApproveCourse = ({courseId , userId} : ApproveCourseProps) => {
    const router = useRouter();
    const handleApprove = async() =>{
       try {
        
        const approve = await approveAccess(courseId,userId);
        toast.success('Approve Course Success')
        router.refresh();
        console.log(approve)
       } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
        
       }
      }
  return (
    <div onClick={handleApprove} className={'xs bg-gradient-to-r from-indigo-500 to-indigo-600 shadow cursor-pointer p-2 text-white text-xs rounded '}>
    Approve
</div>
  )
}

export default ApproveCourse