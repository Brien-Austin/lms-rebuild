"use client"
import { deleteChapter } from '@/app/actions/chapter/deleteChapter'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface DeleteChapterProps {
    id : string
}
const DeleteChapter = ({id} : DeleteChapterProps) => {
    const router = useRouter();

    const handleChapterDelete = async() =>{
        try {
            await deleteChapter(id);
            toast.success('deleted Chapter successfully')
            
        } catch (error) {
            toast.error('Something went wrong');
            
        }

    }
  return (
    <div onClick={handleChapterDelete} className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
             <Trash size={12} className='text-red-500'/>
         </div>
  )
}

export default DeleteChapter