import { Button } from '@/components/ui/button';
import React from 'react'
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
import ChapterTitle from './chapter-title';
import { db } from '@/lib/db';
interface AddChaptersForm {
    id : string;
}
const AddChapters = async({id} : AddChaptersForm) => {

  const chapterData= await db.courses.findUnique({
    where : {
      id : id
    } , 
    select : {
      chapter : true
    }
  })

  return (

  <Drawer>
    <DrawerTrigger>
    <Button variant={'lmsbtnSecondary'}>
    Add Chapters
</Button>
    </DrawerTrigger>
    <DrawerContent className='p-5'>
        <DrawerTitle>
        
        </DrawerTitle>
        <ChapterTitle id={id}  />
        <DrawerFooter>
        <DrawerClose className='border p-2 rounded bg-slate-50 shadow-sm'>
      Back
    </DrawerClose>
        </DrawerFooter>
      
        
    </DrawerContent>
   
  </Drawer>
  )
}

export default AddChapters