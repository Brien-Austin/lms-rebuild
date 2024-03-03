"use client"
import { deleteCourse } from '@/app/actions/course/create/deleteCourse'
import { Eye, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import EditCourse from './edit-course'

interface CourseActionsProps {
    id: string;
    title: string | null | undefined;
    category: string | null | undefined;
    imageUrl: string | null | undefined;
    price: number | null | undefined;
    isFree: boolean | null | undefined;
    description: string | null | undefined;
 
  }



const CourseActions:React.FC<CourseActionsProps> = ({id,title,imageUrl,price,isFree,description,category}) => {
    const router = useRouter()

    const handleDelete = async()=>{
        try {
    
            await deleteCourse(id)
            toast.success('Deleted Course Successfully')
            router.refresh();
            
            
        } catch (error) {
            toast.error('Something went wrong')
            
        }
    
    
    }

  return (
    <div className="flex items-center gap-2 p-2 ">
        <div className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
             <Eye size={12} className='text-green-500'/>
         </div>
       <EditCourse 

       id={id}
       title = {title}
       category={category}
       price = {price}
       imageUrl = {imageUrl}
       isFree = {isFree}
       description = {description}
       
       />
         <div onClick={handleDelete} className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
             <Trash size={12} className='text-red-500'/>
         </div>
 
        </div>
  )
}

export default CourseActions