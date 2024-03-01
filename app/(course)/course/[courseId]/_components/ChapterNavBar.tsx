"use client"
import { setNextChapter, setPreviousChapter } from '@/app/store/features/current-yt-url'
import { useAppSelector } from '@/app/store/store'
import React from 'react'
import {useDispatch} from 'react-redux'

const ChapterNavBar = () => {
  const {} = useAppSelector((state)=>state.ChapterYTUrl)
  const dispatch = useDispatch();
  const handleNext = () =>{
    dispatch(setNextChapter())
  }
  const handlePrevious = () =>{
    dispatch(setPreviousChapter())
  }
  return (
    <div className='bottom-0 left-0 w-full fixed w-full bg-white shadow-lg z-10 p-5'>
        <div  className='flex justify-between items-center '>
            <div  onClick={handlePrevious}className="p-3  cursor-pointer bg-gradient-to-r border border-indigo-600 rounded-full shadow-md px-8 text-indigo-600">
            <h1 className="text-xs">
            Previous
            </h1>
            </div>

            <div onClick={handleNext}  className="p-3 cursor-pointer bg-gradient-to-r  text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-md px-8 ">
            <h1 className="text-xs">
            Mark as complete
            </h1>
            </div>

        </div>
    </div>
  )
}

export default ChapterNavBar