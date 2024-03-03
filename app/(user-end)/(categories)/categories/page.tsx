"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
interface Category  {
  name : string
  description : string
}


const Categories = () => {
  const [categories, setCategories] = useState<Category[]>()
  const [isLoading , setIsLoading] = useState<boolean>(false)


  useEffect(() => {
    const fetchCategory = async() =>{

      const response = await fetch('http://localhost:3001/categories');
  
      const data = await response.json()
      console.log(data)
      if(!response){
        setIsLoading(!isLoading)
      }
  
      console.log(data)
      setCategories(data.category)
     
  
  
  
    }
  
  

  }, [isLoading] )
  console.log(categories)
  return (
    <>
    <h1 className="text-slate-800 font-semibold pt-12 text-xl">
      Explore 
    </h1>

    <div className="flex items-center justify-between gap-2">
      <div className="flex justify-center items-center gap-2">
      {
        categories !== null || undefined  ? 
        (
          <>
          <h1>
            {categories?.map((data,index)=>(
              <div key={index}>
                <h1>
                  hey
                </h1>

              </div>
            ))}
          </h1>

          </>
        ) : 
        (
          <>
          <div className='h-4 w-4 animate-spin'/>

        
          </>
        )
      }
      </div>
    </div>

</>
  )
}

export default Categories
