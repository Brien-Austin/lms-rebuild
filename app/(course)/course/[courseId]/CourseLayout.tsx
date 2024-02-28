import { db } from "@/lib/db";
import React from "react";
import ChaptersView from "./_components/ChaptersView";
import ChapterList from "./_components/ChapterList";
import ChapterNavBar from "./_components/ChapterNavBar";

const CoursePageLayout = async(
    {
       courseId

    } :{
     
            courseId : string
    
    }
) =>{
    const courses = await db.courses.findUnique({
        where : {
            id : courseId
        },
        include : {
            chapter : true
        }
    })
    const chapter = await db.courses.findUnique({
        where : {
            id : courseId
        },
        select : {
            chapter : true
        }
    })
    console.log(courses)
    console.log(chapter?.chapter)

    return (
        <div className="flex gap-2 flex-col">
            {
                courses?.chapter.map((chapter)=>(
                    <><ChaptersView key={chapter.id} firstChapterVideo={courses.chapter[0].youtubeUrl}  id={chapter.id} index={chapter.index} title={chapter.title} imageUrl={chapter.imageUrl} youtubeUrl={chapter.youtubeUrl} description={chapter.description} />
                    
                    </>
                    
                ))
            }
            <div className="mt-48 px-5 ">
                <div className="mt-4 flex flex-col gap-[0.1rem] fixed top-[184px] w-full p-2 shadow-md bg-white z-10 left-2">
                    <h1 className="text-md font-semibold">{courses?.title}</h1>
                    <h1 className=" text-xs text-muted-foreground">
                        {courses?.description}
                    </h1>

                </div>
              <div className="flex flex-col gap-3 mt-24 mb-24">
              {
                    courses?.chapter.map((chapter)=>(
                        <ChapterList title={chapter.title} id={chapter.id} imageUrl={chapter.imageUrl} index={chapter.index} description={chapter.description} youtubeUrl={chapter.youtubeUrl} key={chapter.id} courseName={courses.title} courseDescription={courses.description} />
                    ))
                }
              </div>
                
            </div>

            <ChapterNavBar/>
       
        </div>
    )
   

}

export default CoursePageLayout;