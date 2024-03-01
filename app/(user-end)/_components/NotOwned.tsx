"use client"
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import React from 'react'
import RequestAccess from './RequestAccess'
import Image from 'next/image'
import { useAppSelector } from '@/app/store/store'
import {useDispatch} from 'react-redux'
import { setCurrentChapterUrl } from '@/app/store/features/current-yt-url'
interface NotOwnedProps {

    imageUrl : string
    title : string
    price : number,
    description : string
    totalChapters : number,
    userId : string,
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

const NotOwned = ({title,imageUrl,isFree,description,userId,email,chapters,price,firstName,courseId,totalChapters} : NotOwnedProps) => {
  const processingAccess = useAppSelector((state)=>state.courseRequest.courseRequest[courseId])
    const handleCourseView = () =>{
        if(chapters[0].youtubeUrl !== null){
          dispatch(setCurrentChapterUrl(chapters[0].youtubeUrl))
        }
        console.log(userId)
      
      }

      
    const dispatch = useDispatch();
  return (
    <div onClick={handleCourseView}  className='flex flex-col h-72 rounded-lg cursor-pointer shadow-sm p-2 border'>
    {
      imageUrl !== null && (
        <div className='relative h-36 w-full'>
          <Image unoptimized={true} src={imageUrl} fill className=' rounded-md shadow-md object-cover ' alt='text' />
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
          <Button variant={'purchase'}>
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