"use client"
import { getCourseAccess } from '@/app/actions/request-access/requestAccess'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

interface RequestAccessProps {
  userId : string |  null | undefined,
  email : string |  null | undefined
  firstName : string |  null | undefined
  courseId : string |  null | undefined
}
const RequestAccess = ({userId,email,firstName,courseId}:RequestAccessProps) => {
  const router = useRouter();
 

  const handleRequest = async() =>{
   try {
    if (typeof userId === 'string' && typeof email === 'string' && typeof firstName === 'string' && typeof courseId === 'string' ) {
      await getCourseAccess(firstName, courseId, userId, email);
      toast.success('Access requested successfully')
      router.refresh()
    
      
    }
    
   } catch (error) {
    toast.error('Something went wrong')
    console.log(error)
    
   }

  }
  return (
    <div>
          <Button onClick={handleRequest} variant={'purchase'}>
                Request Access
   </Button>

    </div>
  )
}

export default RequestAccess