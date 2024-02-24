"use client"
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import React from 'react'
import CourseTitle from './course-title-form'
import { AlertDialogFooter } from '@/components/ui/alert-dialog'

const AddCourse = () => {
  return (
 <>
    <AlertDialog>
    <AlertDialogTrigger>
    <Button className='mt-10 '>
        Add a course 🚀
    </Button>
    </AlertDialogTrigger>

   
    <AlertDialogContent className='w-4/5' >
        <CourseTitle/>

       
        <AlertDialogFooter>
        <AlertDialogCancel>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction>
          Create 
        </AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    


 
</AlertDialog>
</>
  )
}

export default AddCourse