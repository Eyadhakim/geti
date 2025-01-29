"use client";

import { MultiLangString } from "@/interfaces/MultiLangString";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function CertificationForm({ cKey }: { cKey?: string }) {
  const [name, setName] = useState<MultiLangString>({ ar: "", en: "" });
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [uploadedPdf, setUploadedPdf] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations("Admin");
  const submitValue = loading? (cKey? `${t("updating")}...`: `${t("submitting")}...`): (cKey? t("update"): t("submit"))
  const canSubmit = (pdf !== null && name.ar.trim().length !== 0 && name.en.trim().length !== 0)

  useEffect(
    () => {
      if (!pdf) return;
      const src = URL.createObjectURL(pdf);
      setPdfSrc(src);
    },
    [pdf]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    const data = new FormData();
    data.set("name", JSON.stringify(name));
    data.set("pdf", pdf);

    const res = await fetch("/api/certifications", {
      method: "POST",
      body: data
    });

    if (res.ok) {
      setName({ ar: "", en: "" });
      setPdf(null);
      setPdfSrc(null);
      alert(t("successfully updated the data"))
    }
    else alert(t("invalid data"))
    setLoading(false);
  }

  return (
    <form className="flex flex-col items-center justify-center w-full max-w-[1300px] px-5 my-20 gap-5" onSubmit={handleSubmit}>
      <button type="button" onClick={() => {console.log(pdf, pdfSrc)}}>Click me</button>
      <div className="flex items-center justify-center gap-5 w-full max-sm:flex-wrap">
        <input
          className="bg-gray-100 w-full p-4 text-start outline-none rounded-md"
          type="text"
          placeholder={`${t("certification name")} (${t("english")})`}
          onChange={e => setName({ ar: name.ar, en: e.target.value })}
          value={name.en}
        />
        <input
          className="bg-gray-100 w-full p-4 text-start outline-none rounded-md"
          type="text"
          placeholder={`${t("certification name")} (${t("arabic")})`}
          onChange={e => setName({ ar: e.target.value, en: name.en })}
          value={name.ar}
        />
      </div>
      <div className="w-full h-32 border-2 relative rounded-md border-dashed">
        <label
          className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer"
          htmlFor="file-upload"
        >
          {t("upload certification here")}
        </label>
        <input
          type="file"
          id="file-upload"
          accept="application/pdf"
          className="hidden"
          onChange={e => setPdf(e.target.files![0])}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-5">
        {pdfSrc &&
          <div className="flex flex-col items-center text-center w-full h-96 gap-4 bg-gray-100 p-2 rounded-md relative max-w-96">
            <h1 className="w-1/2 overflow-hidden text-ellipsis text-nowrap">
              {pdf ? pdf.name : pdfSrc.split("/")[pdfSrc.split("/").length - 1]}
            </h1>
            <button
              type="button"
              onClick={() => {
                setPdf(null);
                setPdfSrc(null);
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
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <Image
                src="/icons/pdf.svg"
                alt={"pdf"}
                fill
                objectFit="cover"
              />
            </div>
          </div>}
        {uploadedPdf &&
          <div className="flex flex-col items-center text-center w-full h-96 gap-4 bg-gray-100 p-2 rounded-md relative max-w-96">
            <h1 className="w-1/2 overflow-hidden text-ellipsis text-nowrap">
              {uploadedPdf.split("/")[uploadedPdf.split("/").length - 1]}
            </h1>
            <button
              type="button"
              onClick={() => {
                setUploadedPdf(null);
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
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <Image
                src="/icons/pdf.svg"
                alt={"pdf"}
                fill
                objectFit="cover"
              />
            </div>
          </div>}
      </div>
      <input 
        type="submit" 
        value={submitValue}
        className="w-full bg-main text-background hover:bg-main/80 text-lg p-4 rounded-md cursor-pointer disabled:bg-main/60 disabled:cursor-not-allowed"
        disabled={loading || !canSubmit}
      />
    </form>
  );
}
