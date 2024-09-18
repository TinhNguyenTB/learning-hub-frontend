'use client'
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface FileUploadProps {
    value: string;
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter
    page: string
}

const FileUpload = ({ value, onChange, endpoint, page }: FileUploadProps) => {
    return (
        <div className="flex gap-4 items-center">
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.error(`ERROR! ${error.message}`);
                }}
                className="w-[280px] h-[280px]"
            />
            {page === "Edit Course" && value !== "" &&
                <Image src={value} alt="image" width={500} height={500}
                    className="w-[280px] h-[280px] object-cover rounded-xl"
                />
            }
            {page === "Edit Section" && value !== "" &&
                (
                    <p className="text-sm font-medium">{value}</p>
                )
            }
        </div>
    )
}

export default FileUpload