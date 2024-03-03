"use client"
import { Home, PlayCircle, Shapes } from 'lucide-react'
import React from 'react'
import NavBarItems from './NavBarItems'

const navRoutes = [
    {
        label : "Home",
        icon : Home,
        href : "/"
    },
    {
        label : "Categories",
        icon : Shapes,
        href : "/categories"
    },
    {
        label : "My  learning",
        icon : PlayCircle,
        href : "/my-learning"
    }
]
const BottomNavBar = () => {
  return (
   <div className="sm:bottom-0 sm:left-0 sm:px-5 sm:py-2 sm:fixed sm:w-full sm:h-16 sm:border-t sm:border-slate-200 sm:bg-white sm:z-10  lg:shadow-lg  lg:left-0 lg:top-0 lg:mb-10 lg:px-12 lg:py-2 fixed lg:h-full lg:flex lg:flex-col lg:w-16 lg:justify-center lg:items-center   lg:bg-white z-10">
 
   <div className="  sm:w-full sm:h-full sm:flex sm:justify-evenly sm:items-center sm:bg-white lg:flex lg:flex-col lg:justify-start lg:gap-16  lg:mt-10   ">
  {
    navRoutes.map((nav,index)=>(
        <>
          <NavBarItems  key={index} label={nav.label} icon={nav.icon} href={nav.href}/>
        </>
    ))
  }
    
   </div>
    
   </div>
  )
}

export default BottomNavBar