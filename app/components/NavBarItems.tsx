"use client"
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface NavBarItemProps {
    label : string ,
    icon : LucideIcon,
    href : string
}

const NavBarItems = ({label , icon : Icon,href} : NavBarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname === '/' && href === '/') || pathname === href
  return (
    <Link href={href}>
    <div className={cn("flex flex-col items-center text-xs gap-2 text-slate-500 " , isActive && "text-slate-900")}>
               <Icon className='' size={20}/>
         <h1 className="">
         {label}
   
         </h1>
    </div>
    </Link>
  )
}

export default NavBarItems