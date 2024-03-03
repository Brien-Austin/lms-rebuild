"use client"
import { Pencil } from 'lucide-react'
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
import TitleForm from './add-course-data/title-form';
import DescriptionForm from './add-course-data/description-from';
import PriceForm from './add-course-data/price-form';
import { ImageForm } from './add-course-data/image-form';
import CategoryForm from './add-course-data/category-form';
  


  interface EditCourseProps {
    id: string;
    title: string | null | undefined;
    category: string | null | undefined;
    imageUrl: string | null | undefined;
    price: number | null | undefined;
    isFree: boolean | null | undefined;
    description: string | null | undefined;
 
  }

const EditCourse = ({id,title,imageUrl,price,isFree,description,category} : EditCourseProps) => {

    const handleEdit = () =>{

    }
  return (
    <Drawer>
        <DrawerTrigger>
        <div onClick={handleEdit} className="h-7 w-7 bg-white shadow-md border border-slate-50 rounded-full flex justify-center items-center ">
    <Pencil size={12} className='text-slate-600'/>
</div>
        </DrawerTrigger>
        <DrawerContent className='p-5'>
           <TitleForm id={id} title={title}/>
           <CategoryForm id={id} category={category}/>
           <DescriptionForm id={id} description={description}/>
           <PriceForm id={id} price={price}/>
           <ImageForm id={id} imageUrl={imageUrl}/>
           <DrawerFooter>
        <DrawerClose className='border py-2 rounded bg-slate-50 shadow-sm'>
      Back
    </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )
}

export default EditCourse