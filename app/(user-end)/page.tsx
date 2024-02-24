import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import React from 'react'

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

  return <div>Home</div>
}

export default Home
