"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const deleteCourse = async(id : string) =>{
    const course = await db.courses.delete({
        where : {
            id
        }
       

    })
    revalidatePath('/')
    
    

}