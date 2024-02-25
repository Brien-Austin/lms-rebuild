import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Values {
  index: number;
  isPublished: boolean;
  imageUrl: string;
  title: string;
  youtubeUrl: string;
  description: string;
}

export async function PUT(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { chapterId } = params;
    if (!chapterId) {
      return new NextResponse("Missing chapterId", { status: 400 });
    }

    const chapterData: Values = await req.json();

    const chapter = await db.chapters.update({

        where : {
            id  : chapterId
        },
      data: {
       ...chapterData
        
        
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
