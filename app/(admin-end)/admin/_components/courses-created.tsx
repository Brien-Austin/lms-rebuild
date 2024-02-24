import { db } from '@/lib/db'
import { Eye, Heading1, Pencil, Trash } from 'lucide-react'
import React from 'react'
import CourseActions from './course-actions'
interface CreatedCoursesProps {
    title : string
    price : string | null
    id : string
}

const CreatedCourses:React.FC<CreatedCoursesProps> = async({title,price,id}) => {
    const courses = await  db.courses.findUnique({
       
        where: {
          id: id,
        },
      
      });
      const chapters = courses?.chapterId


      console.log(chapters)

  return (
    <div className="h-[209px] relative w-full border rounded-xl shadow-sm ">
        <div className="absolute top-0 rounded border-r border-b  px-2 text-white bg-gradient-to-r from-[#E61717] to-[#EA4444] p-[2px]">
           <h1 className="text-xs">
           Not Published
           </h1>
        </div>
        <div className="absolute top-0 right-0">
        <CourseActions id={id} />


        </div>
      <div className='p-3'>
      <div className="flex justify-between items-center mt-5">
        
        <h1 className='text-lg text-slate-600'>{title}</h1>
      
        </div> 
 
        <div className="mt-2">
         {price !==null ? <h1>{price}</h1> : <h1 className='text-muted-foreground italic '>Price not set</h1>}
        </div>
        <div className="mt-2">
        {<h1 className='italic text-muted-foreground text-xs'>
            Description not added
            </h1>}
      </div>

      <div className="mt-2">
        {<h1 className='italic text-muted-foreground text-xs'>
          {chapters === null ? <h1> No chapters were added</h1> : <h1>{chapters?.length} Chapters </h1>}
            </h1>}
      </div>
      <div className="mt-2">
        {<h1 className='italic text-muted-foreground text-xs'>
          {courses?.imageUrl === null ? <h1> No Image  added</h1> : <h1> Image added </h1>}
            </h1>}
      </div>

      </div>

      
    </div>
  )
}

export default CreatedCourses