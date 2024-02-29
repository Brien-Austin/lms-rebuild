import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CourseCardProps {
  id: string | null | undefined;
  title: string | null | undefined;
  imageUrl: string | null | undefined;
  description: string | null | undefined;
  chaptersLength: number | null | undefined;
}

const CourseCard = ({ title, imageUrl, description, chaptersLength ,id}: CourseCardProps) => {
  return (
    <div className='mt-5 flex flex-col gap-5 '>
      <div className="flex-grow flex flex-col">
        <div className="border border-slate-50 cursor-pointer p-2 rounded-lg shadow-sm shadow-sm">
          <div className="h-48 w-full relative">
            {typeof imageUrl === 'string' && (
              <Image fill src={imageUrl} className='absolute object-cover rounded-md' alt='image' />
            )}
          </div>
          <div className="flex flex-col mt-3">
            <h1 className='text-muted-foreground text-xs'>Course Name</h1>
            <h1 className='text-sm'>{title}</h1>
          </div>
          <h1 className='text-slate-600 text-xs'>{description}</h1>

      
          <div className="flex-none mt-3">
           <Link href={`/course/${id}`}>
           <Button size={'sm'} className='w-full'>Continue Learning</Button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
