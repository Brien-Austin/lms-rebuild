import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import React from 'react'
import CourseList from './_components/CourseList'

const Home = async () => {
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress
  const imageUrl = user?.imageUrl

  console.log(email)
  console.log(imageUrl)

  if (user != null && email != null) {
    const existingUser = await db.users.findUnique({
      where: {
        email,
      },
    })

    if (!existingUser) {

      await db.users.create({
        data: {
          email,
          imageUrl,
        },
      })
    } else {

      if (!existingUser.imageUrl && imageUrl) {
        await db.users.update({
          where: {
            email,
          },
          data: {
            imageUrl,
          },
        })
      }
    }
  }

  const courses = await db.courses.findMany({
    where : {
      isPublished : true
    },
    include : {
      chapter : true
    }
  })

  console.log(courses)

  return(
    
    <div className='mb-20'>
      
    {
      courses.map((course,index)=>(
        <div key={course.id} className='mt-5 '>
       <CourseList 

       key={course.id}
       id={course.id}
       title={course.title}
       imageUrl={course.imageUrl}
       price={course.price}
       isPublished={course.isPublished}
       isFree={course.isFree}
       description={course.description}
       chapters={course.chapter}
       />

        </div>
      ))
}
    </div>
  )
}

export default Home



