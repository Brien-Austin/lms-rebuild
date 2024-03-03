import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import React from 'react'
import CourseList from './_components/CourseList'

const Home = async () => {
  const {userId} = auth()
  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress
  const username = user?.firstName;
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
    <>
    <h1 className=' lg:block  sm:text-md lg:text-lg font-medium text-slate-800 lg:mt-0 sm:mt-2'>Explore our courses </h1>
    <h1 className='sm:text-xs lg:block sm:hidden   lg:text-sm  text-slate-500'>Streamline learning, manage courses, track progress with efficient Learning Management System </h1>
    
    <div className='mb-20 sm:flex-none lg:flex lg:flex-wrap lg:gap-5'>
      
    {
      courses.map((course,index)=>(
        <div key={course.id} className='mt-5 z'>
       <CourseList 
       userId={userId}
       category={course.category}


       key={course.id}
       firstName={username}
       email={email}
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
    </>
  )
}

export default Home



