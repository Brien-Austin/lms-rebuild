"use client"
import { approveAccess } from '@/app/actions/approve-access/approveAccess';
import { deleteRequest } from '@/app/actions/deleteRequest/deleteRequest';
import { setAccess } from '@/app/store/features/course-access-given';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux'

interface ApproveCourseProps {
    courseId : string | null
    userId : string | null
    reqId : string | null
}
const ApproveCourse = ({courseId , userId , reqId} : ApproveCourseProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleApprove = async() =>{
       try {
        
        const isAccessGiven = await approveAccess(courseId,userId);
        if(isAccessGiven && typeof courseId == 'string'){
          dispatch(setAccess({courseId,isAccessGiven}))
        }
        
    
        toast.success('Approve Course Success')
        router.refresh();
        console.log(isAccessGiven)
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