import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import React from 'react'
import EditChapter from './edit-chapter';
import { deleteChapter } from '@/app/actions/chapter/deleteChapter';
import DeleteChapter from '../delete-chapter/delete-chapter';

interface ChapterListProps {
    id: string;
    index: number | null;
    isPublished: boolean;
    imageUrl: string | null;
    title: string;
    youtubeUrl: string | null;
    description: string | null;
    courseId: string;
  }

const ChapterList:React.FC<ChapterListProps> = ({id,index,isPublished,imageUrl,title,youtubeUrl,description,courseId}) => {
   
  return (
    <>
   

<div className='p-4 border mb-3 rounded-md'>
<div className="flex justify-between items-center">
    <h1 className="text-md italic">
        {title}
    </h1>
    <div className="flex gap-3 items-center">
    
    <EditChapter
  
    id={id}
    index={index}
    isPublished={isPublished}
    imageUrl={imageUrl}
    title={title}
    youtubeUrl={youtubeUrl}
    description={description}
    courseId={courseId}
/>
   
         
         <DeleteChapter id={id}/>
 


    </div>
</div>

</div>
      
    </>
  )
}

export default ChapterList