import { db } from '@/lib/db'
import { Eye, Heading1, Pencil, Trash } from 'lucide-react'
import React from 'react'
import CourseActions from './course-actions'
import { Button } from '@/components/ui/button'
import AddChapters from './add-chapters/add-chapters'
import Chapters from './edit-chapters/Chapters'
interface CreatedCoursesProps {
    title : string
    price : number | null
    id : string
}

const CreatedCourses:React.FC<CreatedCoursesProps> = async({title,price,id}) => {
    const courses = await  db.courses.findUnique({
       
        where: {
          id: id,
        },
        include: {
          chapter : true
          
          
        }
      
      });
      


      console.log('Course Data',courses)

   

  return (
    <div className="h-[209px] relative w-full border rounded-xl shadow-sm ">
       
      <div className='p-3'>
      <div className="flex justify-center gap-5 items-center ">
        
        <h1 className='text-lg text-slate-600 truncate px-0'>{title}</h1>
        <CourseActions
        title = {courses?.title}
        price = {courses?.price}
        imageUrl = {courses?.imageUrl}
        isFree = {courses?.isFree}
        description = {courses?.description}
         id={id}
          />
          <Button variant={'lmsbtn'}>
            Publish
          </Button>
      
        </div> 
 
        <div className="mt-1 text-xs">
         {price !==null ? <h1>{'\u20B9'}{price}</h1> : <h1 className='text-muted-foreground italic '>Price not set</h1>}
        </div>
        <div className="mt-1">
        {<h1 className='italic text-muted-foreground text-xs'>
            {courses?.description ? <h1 className='italic text-muted-foreground truncate'>
                {courses?.description}
            </h1> : 
            <h1 className='italic text-muted-foreground truncate'>
                No description added
                </h1>
                }
            </h1>}
      </div>

      <div className="mt-1">
        {<h1 className='italic text-muted-foreground text-xs'>
          {courses?.chapter === null ? <h1> No chapters were added</h1> : <h1>{courses?.chapter.length} Chapters </h1>}
            </h1>}
      </div>
      <div className="mt-1">
        {<h1 className='italic text-muted-foreground text-xs'>
          {courses?.imageUrl === null ? <h1> No Image  added</h1> : <h1> Image added </h1>}
            </h1>}
      </div>
      <div className="flex justify-between items-center mt-3">
        <AddChapters id={id}/>
         <Chapters id={id}/>

      </div>
      </div>
    
      

      </div>

      
 
  )
}

export default CreatedCourses