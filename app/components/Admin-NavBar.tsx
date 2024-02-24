"use client"
import { HandHeart, Home, PlayCircle, Shapes, User2 } from 'lucide-react'
import React from 'react'
import NavBarItems from './NavBarItems'

const adminRoutes = [
    {
        label : "Home",
        icon : Home,
        href : "/admin"
    },
    {
        label : "Users",
        icon : User2,
        href : "/users"
    },
    {
        label : "Give Access",
        icon : HandHeart,
        href : "/access"
    }
]
const AdminNavBar = () => {
  return (
   <div className="bottom-0 left-0 px-5 py-2 fixed w-full h-16 border-t border-slate-200 bg-white z-10">
    <div className="w-4/5  bg-gradient from-[#FF5F5F] to-[#FF9080]"></div>
   <div className="  w-full h-full flex justify-evenly items-center bg-white  ">
  {
    adminRoutes.map((nav,index)=>(
        <>
          <NavBarItems  key={index} label={nav.label} icon={nav.icon} href={nav.href}/>
        </>
    ))
  }
    
   </div>
    
   </div>
  )
}

export default AdminNavBar