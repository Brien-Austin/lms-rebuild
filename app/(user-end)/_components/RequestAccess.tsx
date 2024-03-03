"use client"
import { notApproved } from '@/app/actions/approve-access/notApproved'
import { isAlreadyRequested } from '@/app/actions/request-access/isAlreadyRequested'
import { getCourseAccess } from '@/app/actions/request-access/requestAccess'
import { setIsProcessing } from '@/app/store/features/course-access'
import { useAppSelector } from '@/app/store/store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'

interface RequestAccessProps {
  userId : string |  null | undefined,
  email : string |  null | undefined
  firstName : string |  null | undefined
  courseId : string |  null | undefined
  
}
const RequestAccess = ({userId,email,firstName,courseId}:RequestAccessProps) => {
  const dispatch = useDispatch();
  const [loading,setIsLoading] = useState<boolean>(false)

  const router = useRouter();
  const courseAccess = useAppSelector((state)=>state.courseRequest)
  useEffect(()=>{
    const isRequested = async()=>{
      if(typeof courseId === 'string' && typeof userId === 'string'){
        const isProcessing = await notApproved(courseId,userId)
        console.log(isProcessing)
       if(typeof isProcessing === 'boolean'){
        dispatch(setIsProcessing({courseId,isProcessing}))
       }

      }
    }
    isRequested();
  },[dispatch,courseId,userId])


    
 

    const handleRequest = async() =>{
    try {
     
      if (typeof userId === 'string' && typeof email === 'string' && typeof firstName === 'string' && typeof courseId === 'string' ) {
        await getCourseAccess(firstName, courseId, userId, email);
        const isProcessing = true;
        toast.success('Access requested successfully')

        setTimeout(()=>{
        
          dispatch(setIsProcessing({courseId,isProcessing}))
        },1000)
       
       
        
      
        
      }
      
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
      
    }
  

    }

 
  return (
    <div>
          <Button  onClick={handleRequest} variant={'purchase'}>
                Request Access
   </Button>

    </div>
  )
}

export default RequestAccess