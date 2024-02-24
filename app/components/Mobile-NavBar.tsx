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
   <div className="bottom-0 left-0 px-5 py-2 fixed w-full h-16 border-t border-slate-200 bg-white">
    <div className="w-4/5  bg-gradient from-[#FF5F5F] to-[#FF9080]"></div>
   <div className="  w-full h-full flex justify-evenly items-center bg-white  ">
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