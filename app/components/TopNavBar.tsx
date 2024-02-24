import { Search } from 'lucide-react'
import React from 'react'

const TopNavBar = () => {
  return (
    <div className=" flex justify-between items-center">
        <h1 className="font-semibold">
            LAMESI
        </h1>
        <Search className='text-slate-500'/>
    </div>
  )
}

export default TopNavBar