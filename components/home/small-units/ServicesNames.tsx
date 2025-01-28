"use client"

import { Link } from "@/i18n/routing"
import { Service } from "@prisma/client"
import { useEffect, useState } from "react"

export default function ServicesNames() {
  const [ services, setServices ] = useState<Service[]>([])
  
  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/services");
      if (res.ok) setServices(await res.json());
    }
    fetchServices();
  }, [])
  

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {services.map(service => (
        <Link href={`/services/${service.key}`} key={service.id}>{service.title}</Link>
      ))}
    </div>
  )
}
