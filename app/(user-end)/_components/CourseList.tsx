"use client"
import { setCurrentChapterUrl } from '@/app/store/features/currentYoutubeUrl'
import { useAppSelector } from '@/app/store/store'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import RequestAccess from './RequestAccess'
import { isProcessing, userHaveAccess } from '@/app/actions/request-access/haveAccess'
import { useRouter } from 'next/navigation'

interface CourseListProps {
  userId : string | null | undefined
  id: string,
  title: string,
  imageUrl: string | null,
  price: number | null,
  isPublished: boolean,
  isFree: boolean | null,
  description: string | null,
  firstName : string | null | undefined,
  email : string | null | undefined,
  chapters: Chapter[]
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

const CourseList = ({id:courseId,id, userId,chapters,isFree, description,imageUrl ,price,title,firstName,email}: CourseListProps) => {

  const [isRequesting , setRequesting] = useState<boolean>(false)
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean>(false)

  useEffect(()=>{
   const checkAccess = async() =>{
    if(typeof userId === 'string'){
     const onRequest =  await userHaveAccess(courseId,userId)
     if(onRequest){
      setHasAccess(true)
     }
    }

   }

   const hasRequested = async() =>{
    if(typeof userId === 'string'){
     const onRequest =  await isProcessing(courseId,userId)
     if(onRequest){
      setRequesting(true)
     }
    }

   }
   checkAccess();
   hasRequested();
   if(isRequesting){
    router.refresh()
   }

  },[courseId,userId,isRequesting,router])

  console.log(hasAccess)
  const {chapterYoutubeUrl} = useAppSelector((state)=>state.ChapterYTUrl)
  const dispatch = useDispatch();
const handleCourseView = () =>{
  if(chapters[0].youtubeUrl !== null){
    dispatch(setCurrentChapterUrl(chapters[0].youtubeUrl))
  }
  console.log(userId)

}
  return (
    <>
    {
      !hasAccess ? 
      (
        <> 
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
        <Clock size={18} className='text-indigo-500'/> <h1 className='text-xs'>{chapters.length} Chapters</h1>
        
       </div>
     </div>

  <div className="flex justify-between items-center">
   
    {
        isFree ? (
            <> <h1 className='font-semibold text-md text-black'>FREE !</h1>
      {
        isRequesting ? (<>
        <Button variant={'purchase'}>
        pending...
          </Button></>) : (<>
          <RequestAccess userId={userId} email={email} courseId={id} firstName={firstName}/></>)
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
    </div></>
      ) : (
        <>

<Link onClick={handleCourseView} href={`/course/${courseId}`} className='flex flex-col h-72 rounded-lg cursor-pointer shadow-sm p-2 border'>
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
        <Clock size={18} className='text-indigo-500'/> <h1 className='text-xs'>{chapters.length} Chapters</h1>
        
       </div>
     </div>

  <div className="flex justify-between items-center">
   
    {
        isFree ? (
            <> <h1 className='font-semibold text-md text-black'>FREE !</h1>
      {
        isRequesting ? (<>
        <Button variant={'purchase'}>
        pending...
          </Button></>) : (<>
          <RequestAccess userId={userId} email={email} courseId={id} firstName={firstName}/></>)
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
    </Link>
        </>
      )
    }
    </>
  )
}

export default CourseList
