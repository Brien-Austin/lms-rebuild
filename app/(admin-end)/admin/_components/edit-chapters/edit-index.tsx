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
import { editTitle } from '@/app/actions/course/edit/editTitle'
import { editChapterIndex } from '@/app/actions/chapter/editChapterIndex'
const formSchema = z.object({
    index:z.coerce.number()
})

interface EditIndex {
  index : number | null | undefined
  id : string | null | undefined
}

const EditIndex = ({index,id} : EditIndex) => {

    const [isEditing , setEditing] = useState<boolean>(false)
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            index:0
        }
    })
    
const {isSubmitting , isValid  } = form.formState;

const router = useRouter();

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
          if(id !== undefined && id !== null){
            console.log(values.index);
            await editChapterIndex(values.index,id)
           
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
       <div className='mt-2 border  rounded-md px-5 py-2'>
        <div className='text-sm text-slate-600 flex items-center justify-between '>
            Chapter Number
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
            <div className='text-slate-900'>{index !== null ? <h1 className='text-xs italic text-muted-foreground'>{index}</h1> : <h1 className='text-xs italic text-muted-foreground'>No index added</h1>}</div>
            </>
        ) : (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                <FormField control={form.control} name="index" render={({field})=>
            <FormItem>
                <FormControl>
                    <Input disabled={isSubmitting}
                    placeholder={`e.g ${index}'`}
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
 
export default EditIndex;