"use client";

import { useEffect, useState } from "react";
import Title from "../global/Title";
import { Card, Service } from "@prisma/client";
import { notFound } from "next/navigation";
import Loading from "@/app/[locale]/loading";
import Image from "next/image";

export default function ServicePage({ serviceKey }: { serviceKey: string }) {
  const [service, setService] = useState<(Service & { cards: Card[] }) | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    () => {
      const fetchService = async () => {
        const res = await fetch(`/api/services/${serviceKey}`);
        const data = await res.json();
        if (res.ok) {
          setService(data);
          setLoading(false);
        } else {
          setLoading(false);
          return notFound();
        }
      };
      fetchService();
    },
    [serviceKey]
  );

  if (loading) return <Loading />;
  else if (!service) return notFound();

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
