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
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    if (!courseId) {
      return new NextResponse("Missing courseId", { status: 400 });
    }

    const chapterData: Values = await req.json();

    const chapter = await db.courses.update({

        where : {
            id  : courseId
        },
      data: {
        chapter : {
            create : {
                ...chapterData
            }
        }
        
        
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
