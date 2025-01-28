import Image from "next/image";
import { SetStateAction } from "react";

export default function UploadedImages({ images, imagesSources, uploadedImages, setImages, setImagesSources, setUploadedImages }: { 
    images: File[],
    imagesSources: string[],
    uploadedImages?: string[]
    setImagesSources: React.Dispatch<SetStateAction<string[]>>,
    setImages: React.Dispatch<SetStateAction<File[]>>,
    setUploadedImages?: React.Dispatch<SetStateAction<string[]>>,
  }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-96 gap-5">
      {imagesSources.map((src, index) => (
          <div key={index} className="flex items-center text-center w-full h-20 gap-4 bg-gray-100 p-2 rounded-md relative">
            <div className="relative w-1/2 h-full rounded-md overflow-hidden">
              <Image
                src={src}
                alt={src || "Category Image"}
                fill
                objectFit="cover"
                onLoad={() => URL.revokeObjectURL(src)}
              />
            </div>
              <h1 className="w-1/2 overflow-hidden text-ellipsis text-nowrap">
                {images[index]? images[index].name: src.split("/")[src.split("/").length - 1]}
              </h1>
              <button 
                type="button" 
                onClick={() => {
                  const newImages = images.filter((image, i) => i !== index);
                  const newSources = imagesSources.filter((image, i) => i !== index);
                  setImages(newImages);
                  setImagesSources(newSources);
                }}
                className="end-1 top-1 absolute"
              >
                <Image
                  src="/icons/cancel.svg"
                  alt="cancel"
                  width={20}
                  height={20}
                />
              </button>
          </div>
      ))}
      {uploadedImages && uploadedImages.map((src, index) => (
        <div key={index} className="flex items-center text-center w-full h-20 gap-4 bg-gray-100 p-2 rounded-md relative">
        <div className="relative w-1/2 h-full rounded-md overflow-hidden">
          <Image
            src={src}
            alt={src || "Category Image"}
            fill
            objectFit="cover"
          />
        </div>
          <h1 className="w-1/2 overflow-hidden text-ellipsis text-nowrap">
            {src.split("/")[src.split("/").length - 1]}
          </h1>
          <button 
            type="button" 
            onClick={() => {
              const newUploadedImages = uploadedImages.filter((image, i) => i !== index);
              setUploadedImages!(newUploadedImages);
            }}
            className="end-1 top-1 absolute"
          >
            <Image
              src="/icons/cancel.svg"
              alt="cancel"
              width={20}
              height={20}
            />
          </button>
      </div>
      ))}
    </div>
  )
}