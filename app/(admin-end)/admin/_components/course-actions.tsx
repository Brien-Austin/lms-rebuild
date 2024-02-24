"use client"
import { deleteCourse } from '@/app/actions/course/create/deleteCourse'
import { Eye, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface CourseActionsProps {
    id : string 
}



const CourseActions:React.FC<CourseActionsProps> = ({id}) => {
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
        <div className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
             <Pencil size={12} className='text-slate-600'/>
         </div>
         <div onClick={handleDelete} className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
             <Trash size={12} className='text-red-500'/>
         </div>
 
        </div>
  )
}

export default CourseActions