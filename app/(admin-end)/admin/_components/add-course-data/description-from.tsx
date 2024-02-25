"use client"
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
import path from 'path'
import { Textarea } from '@/components/ui/textarea'
import { editDescription } from '@/app/actions/course/edit/editDescription'
const formSchema = z.object({
    description:z.string().min(1,{
        message:"Title is required"
    })
})

interface descriptionProps {
  description : string | null | undefined
  id : string | null | undefined
}

const DescriptionForm = ({description,id} : descriptionProps) => {

    const [isEditing , setEditing] = useState<boolean>(false)
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            description:""
        }
    })
    
const {isSubmitting , isValid  } = form.formState;

const router = useRouter();

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
            if(id !== undefined && id !== null){
              console.log(values.description);
              await editDescription(values.description , id);
              toast.success('Title updated successfully')
              toggleEdit();
              router.refresh();
            }
              
            
          } catch  {
              console.log('Error from Component')
              toast.error('Something went wrong')
              
          }
       
    }
 
const toggleEdit =()=> setEditing((current)=>!current)
   
    return ( 
       <div className='mt-6 border  rounded-md px-5 py-2'>
        <div className='font-medium flex items-center justify-between '>
            Course description
            <Button onClick={toggleEdit} variant="ghost">
               {
                isEditing ? (
                    <>
                    Cancel
                    </>
                ) : (
                    <>
                    <Pencil className='h-4 w-4 mr-2'/>
                    Edit Title
                    </>
                   )
               }

            
           
            </Button>

        </div>
        {!isEditing ? (
            <>
            <p>{description}</p>
            </>
        ) : (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                <FormField control={form.control} name="description" render={({field})=>
            <FormItem>
                <FormControl>
                    <Textarea disabled={isSubmitting}
                    placeholder={`e.g ${description}'`}
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
        </>)
}
       
       </div>
     );
}
 
export default DescriptionForm;