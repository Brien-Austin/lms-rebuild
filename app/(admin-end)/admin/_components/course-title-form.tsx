"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { AlertDialogFooter,AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription  } from '@/components/ui/alert-dialog'
import toast from 'react-hot-toast'
import { createCourse } from '@/app/actions/course/create/createCourse'
import { useRouter } from 'next/navigation'



const CourseTitle = () => {
    const router = useRouter();
    const OnSubmit = async (values:z.infer<typeof formSchema>) =>{
        try {
            createCourse(values.title)
            toast.success('Course created successfully')
            router.refresh();
            
        } catch (error) {
            toast.error('Something went wrong')
        }


    }
    const formSchema = z.object({
        title:z.string().min(5,{
            message:"Title is required"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:""
        }
    })

  
    const {isSubmitting , isValid  } = form.formState;
  return (
   <>
    <AlertDialog>
      <AlertDialogTrigger>
      <Button variant={'lmsbtn'}>Create a course</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-4/5'>
        <AlertDialogTitle>
          Create a course
        </AlertDialogTitle>
        <AlertDialogDescription>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)}>
        
          <FormField control={form.control} name = 'title' render = {({field})=>
          <FormItem className='mb-4'>
              <FormControl>
                  <Input placeholder = 'Title of the course' {...field}/>
              </FormControl>
              <FormDescription className='text-black'>
                  Enter the title of the course
              </FormDescription>
              <FormMessage/>

          </FormItem>}/>

      
<AlertDialogFooter>
             
<AlertDialogCancel className='w-full '>Cancel</AlertDialogCancel>
        <AlertDialogAction  className=' w-full'  type='submit' disabled={!isValid}>
            Continue
        </AlertDialogAction>
       </AlertDialogFooter>

          </form>
          </Form> 
         
          


          

    

        </AlertDialogDescription>
       
        
      
      

      </AlertDialogContent>

    </AlertDialog>

 
   </>
  )
}

export default CourseTitle  