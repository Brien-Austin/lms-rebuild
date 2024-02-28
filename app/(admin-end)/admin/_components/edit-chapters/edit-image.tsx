"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/upload-thing";
import { editImage } from "@/app/actions/course/edit/editImage";
import { editChapterImage } from "@/app/actions/chapter/editChapterImage";



interface EditImageProps {
  imageUrl : string | null | undefined,
  id : string,
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const EditImage = ({
  imageUrl,
  id
}: EditImageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if(values.imageUrl !== null && values.imageUrl !== undefined)
      {
        await editChapterImage(values.imageUrl,id)
        toast.success("Course updated");
      toggleEdit();
      router.refresh();
      }
      
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-2 border rounded-md p-3">
      <div className="text-sm text-slate-600 flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !imageUrl ? (
          <div className="flex items-center justify-center h-20 bg-slate-50 rounded-md">
            <ImageIcon className="h-5 w-5 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 w-20 h-20">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload 
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}