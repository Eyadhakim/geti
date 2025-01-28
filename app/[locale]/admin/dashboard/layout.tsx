"use client";

import Nav from '@/components/dashboard/Nav';
import { useEffect, useState } from 'react';
import Loading from '../../loading';
import { notFound } from 'next/navigation';

export default function DashboardLayout({ children }: {
  children: React.ReactNode,
}) {
  const [ validationState, setValidationState ] = useState("pending");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          credentials: "include"
        });

        if (res.ok) setValidationState("valid");
        else setValidationState("invalid");

      } catch {
        setValidationState("invalid");
      }

    }

    verifyToken()
  }, []);

  if (validationState === "pending") {
    return <Loading/>
  } else {
    return ( validationState === 'valid'?
      <section className='w-full flex flex-col items-center justify-center'>
        <Nav/>
        {children}
      </section>:
      notFound()
    )
  }

}