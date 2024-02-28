import React from 'react'

const ChapterNavBar = () => {
  return (
    <div className='bottom-0 left-0 w-full fixed w-full bg-white shadow-lg z-10 p-5'>
        <div className='flex justify-between items-center '>
            <div className="p-3 bg-gradient-to-r border border-indigo-600 rounded-full shadow-md px-8 text-indigo-600">
            <h1 className="text-xs">
            Previous
            </h1>
            </div>

            <div className="p-3 bg-gradient-to-r  text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full shadow-md px-8 ">
            <h1 className="text-xs">
            Mark as complete
            </h1>
            </div>

        </div>
    </div>
  )
}

export default ChapterNavBar