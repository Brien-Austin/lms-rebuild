"use client"
import React from 'react'
import * as z from 'zod'
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'

import {
    Form,FormControl,FormDescription,FormField,FormLabel,FormMessage,FormItem
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { useState } from 'react'


interface ChapterProps {
    id : string
}

const formSchema = z.object({
  title:z.string().min(1,{
      message:"Title is required"
  })
})
const Chapter = ({id} : ChapterProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        title:""
    }
})
const {isSubmitting , isValid  } = form.formState;
const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
  try {

    if(!id){
      console.log('course ID not defined');
      return;

    }
    await axios.put(`/api/chapter/${id}`,values)
    toast.success('Chapter created')
    router.refresh();
    
    
   
      
    
  } catch  {
      console.log('Error from Component')
      toast.error('Something went wrong')
      
  }
 
}
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
        <FormField control={form.control} name="title" render={({field})=>
    <FormItem>
        <FormControl>
            <Input disabled={isSubmitting}
            placeholder={`e.g Title of The Chapter`}
            {...field}/>
        </FormControl>
    </FormItem>}/>
    <div className='flex items-center gap-x-2 '>
        <Button
        disabled={!isValid || isSubmitting} type='submit'>
            Save

        </Button>
    </div>

    </form>
    </Form>
  )
}

export default Chapter