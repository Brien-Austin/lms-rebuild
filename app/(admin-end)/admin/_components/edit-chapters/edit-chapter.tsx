"use client"
import { AlertTriangle, Check, Pencil } from 'lucide-react'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import EditChapterTitle from './edit-chapter-title';
import EditYTUrl from './edit-yt-url';
import EditIndex from './edit-index';
import EditDescription from './edit-ddescription';
import { EditImage } from './edit-image';
import { Button } from '@/components/ui/button';
import { publishChapter } from '@/app/actions/chapter/publishChapter';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface EditChapterProps {
    id: string;
    index: number | null;
    isPublished: boolean;
    imageUrl: string | null;
    title: string;
    youtubeUrl: string | null;
    description: string | null;
    courseId: string;
  }

const EditChapter:React.FC<EditChapterProps> = ({id,youtubeUrl,title,index,description,imageUrl}) => {

  const requiredFields = [
    title , 
    index,
    imageUrl ,
    youtubeUrl,
    description
  ]
  const total = requiredFields.length;
  const completed = requiredFields.filter(Boolean).length;
  const completionText = `(${completed}/${total})`
  const isComplete = requiredFields.every(Boolean)
  const router = useRouter();

  const handlePublish = async() =>{

    try {
      await publishChapter(id);
      toast.success('Chapter published successfully')
      router.refresh();
      
    } catch (error) {
      toast.error('Something went rong')
      
    }


  }

  return (
    
   <AlertDialog>
    <AlertDialogTrigger>
    <div className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
           <Pencil size={12} className='text-slate-500'/>
         </div>
    </AlertDialogTrigger>
    <AlertDialogContent className='w-full '>
        <EditIndex id={id} index={index}/>
        <EditChapterTitle id={id} title={title}/>
        <EditYTUrl id={id} youtubeUrl={youtubeUrl} />
        <EditDescription id={id} description={description}/>
        <EditImage id={id} imageUrl={imageUrl}/>
        {
          total === completed ? (
            <>
            <div className="bg-green-200 w-full p-2 flex items-center gap-1 rounded">
          <Check size={12} className='text-slate-600'/>
          <h1 className='text-black text-xs font-medium'>{completionText} <span className='text-slate-600'> Every fields uploaded.Publish the Chapter !</span></h1>
        </div>
            </>
          )  : (
            <>
            <div className="bg-yellow-200 w-full p-2 flex items-center gap-1 rounded">
          <AlertTriangle size={12} className='text-slate-600'/>
          <h1 className='text-black text-xs font-medium'>{completionText} <span className='text-slate-600'> fields uploaded.Complete all to publish !</span></h1>
        </div>
            </>
          )
        }
       <AlertDialogFooter>
       
        
       <AlertDialogCancel>Back</AlertDialogCancel>
       
       <Button onClick={handlePublish} disabled={!isComplete} variant={'lmsbtn'} className='mb-3'>
           Publish 
       </Button>
       </AlertDialogFooter>
      
       
    </AlertDialogContent>
   
   </AlertDialog>
  )
}

export default EditChapter