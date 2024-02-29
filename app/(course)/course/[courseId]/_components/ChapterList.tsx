"use client"
import { useCourseIdStore } from '@/app/store/courseId'
import { useAppSelector } from '@/app/store/store'
import { cn } from '@/lib/utils'
import { Download, PlayCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useStore } from 'zustand'
import {useDispatch} from 'react-redux'
import { setCurrentChapterUrl, setCurrentIndex } from '@/app/store/features/currentYoutubeUrl'

interface ChapterListProps {
    id : string
    index : number | null
    title : string | null
    imageUrl : string | null
    description : string | null
    youtubeUrl : string| null
    courseName : string | null
    courseDescription : string | null
    currentIndex: number | null
    courseId : string | null


}
const ChapterList:React.FC<ChapterListProps> = ({index,title,description,youtubeUrl,courseId,courseName,courseDescription,imageUrl,currentIndex}) => {
   const {chapterYoutubeUrl} = useAppSelector((state)=>state.ChapterYTUrl)
   const dispatch = useDispatch();
   const handleChapter = () =>{
    if(youtubeUrl !== null ){
        dispatch(setCurrentChapterUrl(youtubeUrl))
       
          dispatch(setCurrentIndex(currentIndex ?? 0))
        
    }
   }
   console.log('state yt url: ' + chapterYoutubeUrl)
   console.log(youtubeUrl)
   console.log(currentIndex)
    return (

   <div onClick={handleChapter} className={cn("cursor-pointer border w-full text-black text-white p-5 shadow-md rounded-lg",chapterYoutubeUrl === youtubeUrl && "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white")}>
  <div className="flex justify-between items-center">
  <h1 className={cn("text-md font-medium text-black" ,chapterYoutubeUrl === youtubeUrl  && "text-white" )}>
  {title}
  </h1>
  {
    imageUrl !== null && (
        <Link href={imageUrl} download={true}>
            <div className={cn("w-7 h-7 flex justify-center items-center rounded-full text-white shadow- bg-indigo-600" , chapterYoutubeUrl === youtubeUrl && "bg-white  text-indigo-600") }>
            <Download size={15}/>
            </div>
    
  </Link>
    )
  }
  </div>
  <div className={cn("flex items-center gap-2",chapterYoutubeUrl === youtubeUrl && "")}>
    <PlayCircleIcon strokeWidth={3} size={15}/>
    <h1 className="text-sm font-semibold">
    now playing
    </h1>
    
  </div>
  <h1 className={cn(" mt-3 text-slate-700 text-xs",chapterYoutubeUrl === youtubeUrl  && "text-white")}>
    {description}
  </h1>
  
   </div>

  )
}

export default ChapterList