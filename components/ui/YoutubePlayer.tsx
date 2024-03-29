"use client"

import axios from 'axios'
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React from 'react';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player';


interface YoutubePlayerProps {
  url: string;
  isLocked : boolean
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ url,isLocked}) => {
  const router = useRouter();

  const onEnd = async () => {
    try {
     
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
   <>
   {isLocked ? ( <>
    <div className='w-full sm:w-4/5 h-96 lg:w-3/5 mx-auto bg-slate-800 flex items-center justify-center'>
        <div className='flex flex-col  gap-3 items-center text-white text-sm'>
            <Lock/>
            Buy this course to access the course !

        </div>
     
    </div>
   
   </>) : ( <>
    <div className='w-full sm:w-4/5 lg:h-96 sm:h-72 lg:w-3/5 mx-auto'>
      <ReactPlayer 
      
      onEnded={onEnd}
      loop={false}
      url={url} controls={true} light={true} width='100%' height='100%' playing={false}/>
    </div> </>)}

   
   </>
  );
};

export default YoutubePlayer;