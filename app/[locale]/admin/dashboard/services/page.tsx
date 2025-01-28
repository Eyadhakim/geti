"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Service } from "@prisma/client";

export default function Procucts() {
  const t = useTranslations("Admin");
  const [services, setServices] = useState<({ cards: Card[] } & Service)[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services");
      if (res.ok) setServices(await res.json());
    };
    fetchServices();
  }, []);

  return (
    <div className="w-full my-20 flex flex-col items-center gap-20">
      <h1 className="text-5xl text-main">
        {t("services management")}
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-5 w-full">
        <Link
          href="/admin/dashboard/services/add"
          className="min-w-40 p-4 bg-main text-background transition hover:opacity-70 rounded-lg shadow-lg text-xl font-bold text-center"
        >
          {t("add service")}
        </Link>
      </div>
      {services.length !== 0
        ? services.map((service, index) =>
            <div
              key={index}
              className="flex flex-col items-center justify-center my-20 gap-20 p-2"
            >
              <div className="flex items-center justify-center gap-5 flex-wrap">
                <h2 className="text-5xl font-bold">
                  {service.title}
                </h2>
                <Link
                  href={`/admin/dashboard/services/edit/${service.key}`}
                  className="text-dark underline"
                >
                  {t("edit")}
                </Link>
                <button
                  onClick={async () => {
                    const res = await fetch(`/api/services/${service.key}`, {
                      method: "DELETE"
                    });
                    if (res.ok) location.reload();
                    else alert(t("invalid data"));
                  }}
                  className="text-red-500 underline"
                >
                  {t("delete")}
                </button>
              </div>
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
          )
        : <p className="text-mainGray text-xl">
            {t("no services yet")}
          </p>}
    </div>
  );
}
