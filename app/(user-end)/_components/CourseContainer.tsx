"use client"
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface CourseListProps {
    id: string,
    title: string,
    imageUrl: string | null,
    price: number | null,
    isPublished: boolean,
    isFree: boolean | null,
    description: string | null,
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

const CourseContainer = ({id,title,imageUrl,price,isPublished,description,isFree,chapters}:CourseListProps) => {
  return (
    <Link href={`/course/${id}`} className='flex flex-col h-72 rounded-lg cursor-pointer shadow-sm p-2 border'>
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
            <Button variant={'purchase'}>
              Request Access
 </Button>
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
  )
}

export default CourseContainer