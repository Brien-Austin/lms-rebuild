
import { setCurrentChapterUrl } from '@/app/store/features/current-yt-url'
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

import NotOwned from './NotOwned'
import Owned from './Owned'

interface CourseListProps {
  userId : string | null | undefined
  id: string,
  title: string,
  category: string | null,
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

const CourseList = async({id:courseId,id, userId,chapters,isFree, category,description,imageUrl ,price,title,firstName,email}: CourseListProps) => {
  const hasAccess = await userHaveAccess(courseId,userId)
  console.log(hasAccess)
  return (
    <>
        
    {
  
      !hasAccess ? 
      (
        <> 
        <NotOwned
              title={title}
              category={category || ''}
              imageUrl={imageUrl || ''}
              isFree={isFree || false}
              description={description || ''}
              userId={userId || ''}
              email={email || ''}
              chapters={chapters}
              price={price || 0}
              firstName={firstName || ''}
              courseId={id}
              totalChapters={chapters.length}
            />
       
       </>
      ) : (
        <>
         <Owned
              title={title}
              hasOwned={hasAccess}
              imageUrl={imageUrl || ''}
              category={category || ''}
              isFree={isFree || false}
              description={description || ''}
              userId={userId || ''}
              email={email || ''}
              chapters={chapters}
              price={price || 0}
              firstName={firstName || ''}
              courseId={id}
              totalChapters={chapters.length}
            />


        </>
      )
    }
    </>
  )
}

export default CourseList
