"use client"
import Title from "@/components/global/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Contact() {
  const t = useTranslations("Contact");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState(`Hello, my name is ${name}%0A${text}`);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const textQuery = searchParams.get("text");
    const subjectQuery = searchParams.get("subject");
    if (textQuery) setText(textQuery);
    if (subjectQuery) setSubject(subjectQuery);
  }, [searchParams])

  useEffect(() => {
    setMessage(`Hello, my name is ${name}%0A${text}`)
  }, [text, name])
  
  
  

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Title
        title={t("contact us")}
        pathes={["/contact"]}
        pathesTitles={[t("contact us")]}
      />
      <div className="w-full max-w-[1300px] flex flex-wrap items-start justify-center gap-20 my-40">
        <div className="w-full max-w-96 flex flex-col items-start justify-center gap-3">
          <h2 className="text-4xl font-bold">{t("contact us")}</h2>
          <div className="flex items-center justify-center gap-5">
            <div className="rounded-full relative border shadow w-16 h-16">
              <Image
                src="/icons/contact.svg"
                alt="contact"
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center text-sm">
              <p>
                +20 2 2448 9321
              </p>
              <p>
                +20 2 4456 4066
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="rounded-full relative border shadow w-16 h-16">
              <Image
                src="/icons/mail.svg"
                alt="mail"
                fill
                objectFit="cover"
              />
            </div>
              <p>
                info@geti-alu.com
              </p>
          </div>
        </div>
        <div className="w-full max-w-[500px] h-fit shadow-lg p-10 text-start gap-5 flex content-center justify-center flex-wrap">
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            className="w-full h-12 rounded-md border-mainGray border-2 outline-none text-start px-4 placeholder:text-mainGray"
          />
          <input 
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t("subject")}
            className="w-full h-12 rounded-md border-mainGray border-2 outline-none text-start px-4 placeholder:text-mainGray"
          />
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("your message")}
            className="w-full h-40 rounded-md border-mainGray border-2 outline-none text-start p-4 placeholder:text-mainGray"
          />
          <Link
            href={`mailto:info@geti-alu.com?subject=${subject}&body=${message}`}
            className="bg-[#ee5252] rounded-full p-4 w-40 cursor-pointer hover:bg-[#ee5252dd]"
          >{t("submit")}</Link>
        </div>
      </div>
    </div>
  )
}
