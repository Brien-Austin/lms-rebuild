
import { getOwnedCourse } from '@/app/actions/course/getCourse'
import { db } from '@/lib/db';
import React, { useEffect, useState } from 'react'
import CourseCard from './owned-course-card';

interface OwnedCoursesProps {
    id : string | null
}

interface Course {
    _id: string | null;
    title: string | null;
    isFree: boolean | null;
    description: string | null;
    price: number | null;
    imageUrl: string | null;
    isPublished: boolean | null;
    chapter : Chapter[]
  }

  interface Chapter {
    _id: string | null;
    isPublished: boolean | null;
    title: string | null;
    courseId: string | null;
    index: number | null;
    youtubeUrl: string | null;
    description: string | null;
    imageUrl: string | null;
  }
  

const OwnedCoursesList = async( {id} : OwnedCoursesProps) => {
    const courses = await getOwnedCourse(id)
    console.log('Owned courses',courses)
   
  return (
    <div className='sm:hidden lg:block'>
      {
        <CourseCard id={courses?.id} title={courses?.title} description={courses?.description} imageUrl={courses?.imageUrl} chaptersLength={courses?.chapter.length}/>
      }
    </div>
  )
}

export default OwnedCoursesList