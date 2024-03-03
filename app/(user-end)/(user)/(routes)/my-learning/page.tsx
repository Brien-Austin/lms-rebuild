import { Button } from '@/components/ui/button';
import { SignOutButton, UserButton, auth, useAuth, useUser } from '@clerk/nextjs'
import { EmailAddress, currentUser } from '@clerk/nextjs/server'
import { ChevronRight, LogOut, Settings, Settings2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { redirect } from 'next/navigation';
import SignOutUser from './_components/SignOutUser';
import { db } from '@/lib/db';
import OwnedCoursesList from './_components/ownedCourses';


const MyLearning = async () => {
  const {userId} = auth();
  const userID : string = userId !==null ? userId : '';

  const ownedCourses = await db.requestAcess.findMany({
    where : {
      userId : userID,
      courseAccess : {
        isGivenAccess : true
      }
      
    },
    select : {
      courseAccess : true
    }
  })

  const purchased = await db.purchase.findMany({
    where : {
      userId : userID
    }
  })
  console.log(purchased)
 console.log(ownedCourses)
  if(!userId ){
    return redirect('/')

  }
  const user = await currentUser();
  const firstName= user?.firstName

 
  return (
    <div>
   <div className="flex justify-between items-center pt-5">
    <div className="flex items-center justify-center gap-2">
{
  user !== null  && (
    <Image className='rounded-full' src={user?.imageUrl} alt='profile' height={50} width={50}/>
  )
}
   <div className="flex flex-col gap-0">
   <h1 className="whitespace-nowrap text-[18px]">
   {firstName}
   </h1>
   <h1 className='text-[14px] text-muted-foreground'>{ownedCourses.length } course enrolled</h1>
   </div>
   

    </div>
<Dialog >
  <DialogTrigger>
  <Settings className='text-slate-500'/>
  </DialogTrigger>

<DialogContent className='w-4/5'>
    <DialogHeader>
      Settings
    </DialogHeader>
    <SignOutUser userId={userId}/>
  </DialogContent>

</Dialog>
   
   </div>
  
 {
  ownedCourses.length > 0 ? (
    <>
   {
    ownedCourses.map((course)=>(
      <div key={course.courseAccess?.id}>
       {typeof course.courseAccess?.courseId === 'string'  &&
       (
        <OwnedCoursesList id={course.courseAccess?.courseId} />
       )

       }


      </div>
    ))
   }

    </>
  ) : 
  (
    <>
      <div className="flex justify-center items-center flex-col gap-10 ">
  
  <Image  className="object-cover h-80 w-full drop-shadow-xl"unoptimized={true}src={'/study.png'} height={100} width={100} alt='study'/>
  <Link href={'/categories'}>
  <Button className='m- rounded-full'>
    Explore courses
  </Button>
  </Link>
 </div>
    </>
  )
 }
     
    </div>
  )
}

export default MyLearning