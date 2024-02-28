import React from 'react'
import CoursePageLayout from './CourseLayout'

const Course = (
  {
    params
  } : {
    params : {
      courseId : string
    }
  }
) => {
  const courseId = params.courseId
  return (
    <div>
      
      <CoursePageLayout courseId={courseId}/>
      

    </div>
  )
}

export default Course