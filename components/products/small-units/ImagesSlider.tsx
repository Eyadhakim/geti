"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

export default function ImagesSlider({ normalImages, threeSixtyImage }: {
  normalImages: string[],
  threeSixtyImage: string | null
}) {
  const allImages = threeSixtyImage? [...normalImages, threeSixtyImage]: [...normalImages];
  const [ imageIndex, setImageIndex ] = useState(0);
  const imagesRef = useRef<HTMLImageElement>(null);

  return (
    <div className="w-80 h-80 relative flex items-center justify-center overflow-hidden">
      <button 
        className="absolute -left-4 z-10 disabled:opacity-30"
        disabled={imageIndex === 0}
        onClick={() => {
          setImageIndex(imageIndex - 1);
        }}
        >
        <Image
          src="/icons/arrow-left.svg"
          alt="left"
          width={75}
          height={75}
          draggable={false}
        />
      </button>
      <button 
        className="absolute -right-4 z-10 disabled:opacity-30"
        disabled={imageIndex === allImages.length - 1}
        onClick={() => {
          setImageIndex(imageIndex + 1);
        }}
      >
        <Image
          src="/icons/arrow-right.svg"
          alt="right"
          width={75}
          height={75}
          draggable={false}
          />
      </button>
      <div 
        style={{ 
          width: `${100*allImages.length}%`,
          transition: "0.5s", 
          transform: `translateX(-${(100/allImages.length)*imageIndex}%)`
        }}
        className="h-full flex items-center justify-around absolute left-0 top-0"
        ref={imagesRef}

      >
        {normalImages.map((image, index) => (
          <div key={image+index} className="h-60 w-60 relative">
            <Image
              src={allImages[index]}
              alt="Product image"
              fill
              objectFit="cover"
              draggable={false}
            />
          </div>
        ))}
        {threeSixtyImage &&
          <div className="h-60 w-60 relative">
            <ReactPhotoSphereViewer src={threeSixtyImage} width="100%" height="100%" />
          </div>
        }
      </div>
    </div>
  )
}
