"use client";

import Title from "../global/Title";
import Image from "next/image";

export default function ServicePage({ serviceKey }: { serviceKey: string }) {
  const service = 
    {
      id: 1,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
      cards: [
        {
          id: 1,
          key: "Card",
          title: "Card",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
          serviceId: 1,
          image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
          lang: "ar"
        },
        {
          id: 1,
          key: "Card",
          title: "Card",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
          serviceId: 1,
          image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
          lang: "ar"
        },
        {
          id: 1,
          key: "Card",
          title: "Card",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
          serviceId: 1,
          image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
          lang: "ar"
        },
        {
          id: 1,
          key: "Card",
          title: "Card",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
          serviceId: 1,
          image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
          lang: "ar"
        },
        { 
          id: 1,
          key: "Card",
          title: "Card",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
          serviceId: 1,
          image: "/images/6677171b-3b16-4305-bd9e-01e44bc8987e.jpg",
          lang: "ar"
        }
      ]
    };



  return (
    <div className="w-full">
      <Title
        title={service.title}
        pathes={[`/services/${serviceKey}`]}
        pathesTitles={[service.title]}
      />
      <div className="flex flex-col items-center justify-center my-20 gap-20 p-2">
        <h2 className="text-5xl font-bold">
          {service.title}
        </h2>
        <p className="max-w-[1000px] text-lg">
          {service.description}
        </p>
        <div className="flex items-center justify-center max-w-[1400px] w-screen h-fit flex-wrap gap-10">
          {service.cards.map((card, index) =>
            <div
              key={index}
              className="w-full max-w-96 h-fit min-h-[500px] rounded-md overflow-hidden flex flex-col gap-5 shadow-lg"
            >
              <div className="w-full h-52 relative">
                <Image
                  src={card.image}
                  alt="service image"
                  fill
                  objectFit="cover"
                />
              </div>
              <h1 className="text-4xl mx-2">
                {card.title}
              </h1>
              <p className="mx-5 text-balance mb-10">
                {card.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
