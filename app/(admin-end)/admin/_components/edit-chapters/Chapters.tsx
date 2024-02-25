
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import React from 'react'
import { db } from "@/lib/db"
import ChapterList from "./ChapterList"

interface ChaptersProps {
    id : string
}
const Chapters:React.FC<ChaptersProps> =async({id}) => {
    const chapters = await db.chapters.findMany({
        where : {
            courseId : id
        }
    })
    console.log(chapters)

  return (
  <>
  <Drawer>
    <DrawerTrigger>
        <Button variant={'lmsbtnSecondary'}>
            Edit Chapters
        </Button>
    </DrawerTrigger>
    <DrawerContent className="flex flex-col gap-3 px-4 ">
  {
    chapters.length > 0 ? (
        <>
          {
    chapters.map((chap)=>(
        <ChapterList
    key={chap.id}
    id={chap.id}
    index={chap.index}
    isPublished={chap.isPublished}
    imageUrl={chap.imageUrl}
    title={chap.title}
    youtubeUrl={chap.youtubeUrl}
    description={chap.description}
    courseId={chap.courseId}
/>
    ))
  }
        </>
    ) : 
    (
        <>
         <div className='p-5 '>
                <h1 className="italic text-ceneter text-md">
                    No Chapters Added
                </h1>

            </div>

        </>
    )
  }
    </DrawerContent>
  </Drawer>
  </>
   
  )
}

export default Chapters