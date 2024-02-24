"use client"
import { SignOutButton, auth } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
interface SignOutUserParams {
    userId : string
}

const SignOutUser = ({userId}:SignOutUserParams) => {
   
    const router = useRouter();
   
    const handleLogOut =() => {
        if(!userId){
            router.push('/')
        }

    }
  return (
    <>
    <div onClick={handleLogOut} className='mt-5 p-3 bg-slate-5s0 rounded flex items-center gap-3  '>
   <LogOut size={18}/>
    <SignOutButton />
    </div></>
  )
}

export default SignOutUser