"use client"

import { Link } from "@/i18n/routing"
import { Service } from "@prisma/client"
import { useEffect, useState } from "react"

export default function ServicesNames() {
  const [ services, setServices ] = useState<Service[]>([
    {
      id: 1,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
    },
    {
      id: 2,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
    },
    {
      id: 3,
      title: "Service",
      key: "Service",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta esse itaque magnam asperiores aliquid harum ullam at rerum, necessitatibus quasi. Consequuntur neque corrupti optio ab assumenda doloribus ducimus excepturi",
      lang: "ar",
    }
  ])  

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {services.map(service => (
        <Link href={`/services/${service.key}`} key={service.id}>{service.title}</Link>
      ))}
    </div>
  )
}
