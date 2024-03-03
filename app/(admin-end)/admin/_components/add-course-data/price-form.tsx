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

import { cn } from '@/lib/utils'
import { editPrice } from '@/app/actions/course/edit/editPrice'
import { formatPrice } from '@/lib/formatCurrency'
const formSchema = z.object({
    price:z.coerce.number()
})

interface priceForm {
  price : number | null | undefined,
  id : string
}

const PriceForm = ({price , id} : priceForm) => {

    const [isEditing , setEditing] = useState<boolean>(false)
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            price:price || undefined
        }
    })
    
const {isSubmitting , isValid  } = form.formState;

const router = useRouter();

    const onSubmit =  async(values:z.infer<typeof formSchema>) =>{
        try {
            await editPrice(values.price,id)
            toast.success('Course updated successfully')
            toggleEdit();
            router.refresh();
            
          
        } catch (error) {
            console.log('Error from Component')
            toast.error('Something went wrong')
            
        }
       
    }
 
const toggleEdit =()=> setEditing((current)=>!current)
   
    return ( 
       <div className='mt-2 border  rounded-md px-4 py-2'>
        <div className='font-medium flex items-center justify-between '>
          <h1 className="text-sm text-slate-600">  Course price</h1>
            <Button onClick={toggleEdit} variant="ghost">
               {
                isEditing ? (
                    <>
                    Cancel
                    </>
                ) : (
                    <>
                    <Pencil className='h-4 w-4 mr-2'/>
                    Edit Price
                    </>
                   )
               }

            
           
            </Button>

        </div>
        {!isEditing  ? (
            <>
            <p  className={cn("text-xs ",price && "text-slate-500 italic")}>{price || 'No Description added'}</p>

            </>
        ) : (<>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
                <FormField control={form.control} name="price" render={({field})=>
            <FormItem>
                <FormControl>
                    <Input disabled={isSubmitting}
                    placeholder={`Set a price for your course`}
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
 
export default PriceForm;