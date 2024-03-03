"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Clock } from 'lucide-react'
import React, { useEffect } from 'react'
import RequestAccess from './RequestAccess'
import Image from 'next/image'
import { useAppSelector } from '@/app/store/store'
import {useDispatch} from 'react-redux'
import { setCurrentChapterUrl } from '@/app/store/features/current-yt-url'
import { setDefaultProcessing, setIsProcessing } from '@/app/store/features/course-access'
import { isAlreadyRequested } from '@/app/actions/request-access/isAlreadyRequested'
import toast from 'react-hot-toast'
import { notApproved } from '@/app/actions/approve-access/notApproved'
interface NotOwnedProps {

    imageUrl : string
    title : string
    price : number,
    description : string
    totalChapters : number,
    userId : string,
    category : string,
    email : string
    courseId : string,
    firstName : string
    isFree : boolean
    chapters : Chapter[]

}
interface Chapter {
    id: string,
    index: number | null,
    isPublished: boolean | null,
    imageUrl: string | null,
    title: string | null, 
    
    youtubeUrl: string | null,
    description: string | null
  }

const NotOwned = ({title,imageUrl,isFree,category,description,userId,email,chapters,price,firstName,courseId,totalChapters} : NotOwnedProps) => {
  const dispatch = useDispatch();
  const onClick = async () => {
    try {
 

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      
    }
  }

  useEffect(()=>{
    const isRequestedOrNot = async() =>{
      const isProcessing = await notApproved(courseId, userId);
      
      if(isProcessing) {
        dispatch(setIsProcessing({courseId,isProcessing}))
      }
    }
    isRequestedOrNot();

  },[courseId,userId,dispatch])
  
 


  
  const processingAccess = useAppSelector((state)=>state.courseRequest.courseRequest[courseId])
  if(typeof processingAccess === 'undefined'){
    dispatch(setDefaultProcessing({courseId}))
  }
  console.log(processingAccess);
 
    const handleCourseView = () =>{
        if(chapters[0].youtubeUrl !== null){
          dispatch(setCurrentChapterUrl(chapters[0].youtubeUrl))
        }
        console.log(userId)
      
      }

      

  return (
    <div onClick={handleCourseView}  className='sm:flex sm:flex-col sm:h-72 sm:rounded-lg cursor-pointer shadow-sm sm:p-2 lg:flex lg:flex-col lg:h-72 lg:w-96 lg:shadow-md border'>
    {
      imageUrl !== null && (
        <div className='relative h-36 w-full'>
        <h1 className='text-xs top-0 left-0 absolute z-10 border border-indigo-600 bg-white p-1 rounded text-indigo-600' style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.1)' }}>{category}</h1>
        
          <Image unoptimized={true} src={imageUrl} fill className='rounded-md shadow-md object-cover' alt='text' />
        </div>
      )
    }

 
    <div className='flex-grow'>
     <h1 className="text-md pt-2 pb-1">
     {title}
     </h1>
     <h1 className='text-muted-foreground italic text-xs truncate'>
      {description}
     </h1>
     <div className="flex items-center gap-1 pt-2">
      <Clock size={18} className='text-indigo-500'/> <h1 className='text-xs'>{totalChapters} Chapters</h1>
      
     </div>
   </div>

<div className="flex justify-between items-center">
 
  {
      isFree ? (
          <> <h1 className='font-semibold text-md text-black'>FREE !</h1>
    {
      processingAccess ? (<>
      <Button variant={'purchase'}>
      pending...
        </Button></>) : (<>
        <RequestAccess userId={userId} email={email} courseId={courseId} firstName={firstName}/></>)
    }
 </>
      ) : (
          <>
           <h1 className='font-semibold text-md text-black'> &#8377;{price}</h1>
          <Button onClick={onClick} variant={'purchase'}>
  Buy course
 </Button>
          </>
      )
  }
</div>
  </div>
  )
}

export default NotOwned