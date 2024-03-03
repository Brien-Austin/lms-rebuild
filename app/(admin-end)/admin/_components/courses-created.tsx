import { db } from '@/lib/db'
import { AlertCircle, Check, CheckCircle, Eye, Heading1, Pencil, Trash } from 'lucide-react'
import React from 'react'
import CourseActions from './course-actions'
import { Button } from '@/components/ui/button'
import AddChapters from './add-chapters/add-chapters'
import Chapters from './edit-chapters/Chapters'
import PublishCourse from './publish-course'
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
     
   const requiredFields = [
    courses?.title,
    courses?.price,
    courses?.description,
    courses?.imageUrl,
   courses?.chapter
  ]

  const total = requiredFields.length
  const completed = requiredFields.filter(Boolean).length
  const completionText = `(${completed}/${total}) Uploaded`
  const isCompleted = requiredFields.every(Boolean)
 


  return (
    <div className="h-[224px] relative w-full border rounded-xl shadow-sm ">
    
      <div className='px-3'>
       {
        isCompleted ? 
        (
          <>
           <div className="w-full bg-green-100 flex px-2 gap-2 items-center h-7 rounded-b rounded-l rounded-r">
            <CheckCircle className='text-slate-600' size={15}/>
         <h1 className='text-xs px-2 py-1'> {completionText} Publish your course</h1>

        </div>
          </>
        ) : 
        (
          <>
              <div className="w-full bg-yellow-100 flex px-2 gap-2 items-center h-7 rounded-b rounded-l rounded-r">
            <AlertCircle className='text-slate-600' size={15}/>
         <h1 className='text-xs px-2 py-1'> {completionText} Upload all fields to publish</h1>

        </div>
          </>
        )
       }
      <div className="flex justify-center gap-5 items-center mt-2 ">
        
        <h1 className='text-lg text-slate-600 truncate px-0'>{title}</h1>
        <CourseActions
        category={courses?.category}
        title = {courses?.title}
        price = {courses?.price}
        imageUrl = {courses?.imageUrl}
        isFree = {courses?.isFree}
        description = {courses?.description}
         id={id}
          />
          <PublishCourse isCompleted={isCompleted} isPublished={courses?.isPublished}id={id}/>
      
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