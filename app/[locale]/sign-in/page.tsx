'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import Loading from '../loading';
import { notFound, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ validationState, setValidationState ] = useState("pending");
  const router = useRouter();
  const errorRef = useRef<HTMLHeadingElement>(null);
  const t = useTranslations("Admin");
  const queryKey = useSearchParams().get("key");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      router.push("/admin/dashboard");
    }

    else {
      errorRef.current?.classList.remove("hidden");
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          credentials: "include"
        });

        if (res.ok) router.push("/admin/dashboard");
        else setValidationState("invalid");

      } catch {
        setValidationState("invalid");
      }

    }

    verifyToken()
  }, [router]);

  if (validationState === 'pending') return <Loading/>
  else {
    return (queryKey === process.env.NEXT_PUBLIC_ADMIN_KEY?
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-background rounded-lg shadow-xl p-8">
            <div className="flex justify-center mb-8">
              <div className="bg-main/10 p-3 rounded-full">
                <Image
                  src="/icons/lock.svg"
                  alt='Lock'
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-main mb-8">
              {t("admin dashboard")}
            </h2>
            <form onSubmit={handleSubmit} 
              className="space-y-6">
              <div className="space-y-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-gray-200 border-2 p-2 rounded-md outline-none text-start"
                  placeholder={t("enter your email")}
                />
              </div>
              <div className="space-y-2">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-gray-200 border-2 p-2 rounded-md outline-none text-start"
                  placeholder={t("enter your password")}
                />
              </div>
              <div className='text-red-500 text-center h-5 flex items-center justify-center'>
                <h1 className='hidden' ref={errorRef}>
                  {t("invalid credentials")}
                </h1>
              </div>
              <button type="submit" className="w-full bg-main rounded-md p-2 text-background font-bold hover:bg-main/90">
                {t("sign in")}
              </button>
            </form>
          </div>
        </div>
      </div>: notFound()
    );
  }

}