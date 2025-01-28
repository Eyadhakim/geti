"use client"

import { useTranslations } from "next-intl"
import { useState } from "react";

export default function DeleteModal({ handleSubmitClick, handleCancelClick }: {
  handleSubmitClick: () => void,
  handleCancelClick: () => void
}) {
  const t = useTranslations("Admin");
  const [ loading, setLoading ] = useState<boolean>(false);

  return (
    <div 
      className="fixed w-screen h-screen left-0 top-0 bg-foreground/20 flex items-center justify-center z-50 p-2"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCancelClick()
        }
      }}
    >
      <div className="w-full max-w-[1000px] h-96 bg-background flex flex-col items-center justify-evenly rounded-md">
        <h1 className="text-2xl mx-2">{t("are you sure you want to delete these data")}</h1>
        <div className="w-full flex justify-center gap-5 flex-wrap">
          <button 
            className="bg-main text-background p-2 min-w-32 text-lg font-bold rounded-md hover:bg-main/80 disabled:cursor-not-allowed disabled:bg-main/60"
            onClick={() => {
              handleSubmitClick();
              setLoading(true);
            }}
            disabled={loading}
          >{loading? `${t("submitting")}...` :t("submit")}</button>
          <button 
            className="border-main border-2 p-2 min-w-32 text-lg font-bold rounded-md hover:bg-foreground/10"
            onClick={handleCancelClick}
          >{t("cancel")}</button>
        </div>
      </div>
    </div>
  )
}