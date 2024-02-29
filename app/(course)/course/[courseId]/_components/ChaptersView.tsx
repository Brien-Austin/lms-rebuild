"use client"
import { useAppSelector } from "@/app/store/store";
import currentYoutubeUrl, { setCurrentChapterUrl, setTotalChapter } from "@/app/store/features/currentYoutubeUrl";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import YouTubePlayer from "react-player/youtube";

interface ChapterProps {
  id: string;
  index: number | null;
  isPublished: boolean | null;
  imageUrl: string | null;
  title: string | null;
  youtubeUrl: string | null;
  description: string | null;
}

interface Chapter {
  chapters: ChapterProps[];
}

const ChaptersView: React.FC<Chapter> = ({ chapters }) => {
  const { currentIndex ,chapterYoutubeUrl} = useAppSelector((state) => state.ChapterYTUrl);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setTotalChapter(chapters.length));
    if (chapters[currentIndex]?.youtubeUrl !== null) {
      dispatch(setCurrentChapterUrl(chapters[currentIndex]?.youtubeUrl ?? ''));
    }
  }, [dispatch, chapters, currentIndex]);

  return (
    <div>
      <div className="relative">
        <div className="fixed top-0 w-full h-48">
          <div className="px-2 mt-2 rounded-md w-full h-48">
            <YouTubePlayer controls url={chapterYoutubeUrl} height={'100%'} width={'100%'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaptersView;
