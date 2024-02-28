"use client"
import { useCourseIdStore } from "@/app/store/courseId";
import currentYoutubeUrl, { setCurrentChapterUrl } from "@/app/store/features/currentYoutubeUrl";
import { useAppSelector } from "@/app/store/store";

  
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'

import YouTubePlayer from "react-player/youtube";
import { useStore } from "zustand";

interface ChapterProps {
    id: string;
    index: number | null;
    firstChapterVideo: string | null
 
    imageUrl: string | null;
    title: string | null;
    youtubeUrl: string | null;
    description: string | null;
  
  }

  
  const ChaptersView: React.FC<ChapterProps> = ({ title, youtubeUrl }) => {
    const chapterYtUrl = useAppSelector((state)=>state.ChapterYTUrl)
    const dispatch = useDispatch();
    const { setChapterId, chapterId } = useStore(
      useCourseIdStore,
      (state) => state
    );
  
    
  
    return (
      <div>
        
        <div className="relative">
          <div className="fixed top-0 w-full h-48">
            <div className="px-2 mt-2 rounded-md w-full h-48">
              {chapterId !== null && (
                <YouTubePlayer controls url={chapterYtUrl.chapterYoutubeUrl } height={'100%'} width={'100%'}/>
              )}
            </div>
          </div>

        </div>
        
      </div>
    );
  };  
  
  export default ChaptersView;
  