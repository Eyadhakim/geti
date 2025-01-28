"use client";

import { useRouter } from "@/i18n/routing";
import { MultiLangString } from "@/interfaces/MultiLangString";
import { Card, Service } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function ServiceForm({ serviceKey }: { serviceKey: string }) {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const router = useRouter();
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cardTitleAr, setCardTitleAr] = useState<string>("");
  const [cardDescriptionAr, setCardDescriptionAr] = useState<string>("");
  const [cardTitleEn, setCardTitleEn] = useState<string>("");
  const [cardDescriptionEn, setCardDescriptionEn] = useState<string>("");
  const [cards, setCards] = useState<{
    title: {
      ar: string,
      en: string
    },
    description: {
      ar: string,
      en: string
    },
    image: File,
    imageSource: string
  }[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number|null>(null)
  const [title, setTitle] = useState<MultiLangString>({ ar: "", en: "" });
  const [description, setDescription] = useState<MultiLangString>({
    ar: "",
    en: ""
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedCardEditMode, setFetchedCardEditMode] = useState<boolean>(false);
  const [fetchedCards, setFetchedCards] = useState<{ ar: Card[], en: Card[] }>({ar: [], en: []});
  const canSubmit =
  title.ar.trim().length !== 0 &&
  title.en.trim().length !== 0 &&
  description.ar.trim().length !== 0 &&
  description.en.trim().length !== 0 &&
  (cards.length !== 0 || fetchedCards.en.length !== 0);
  const canSubmitCard = (imageSrc && cardTitleAr.trim().length !== 0 && cardDescriptionAr.trim().length !== 0 && cardTitleEn.trim().length !== 0 && cardDescriptionEn.trim().length !== 0);
  const submitValue = loading ? `${t("submitting")}...` : t("submit");

  useEffect(() => {
    const fetchService = async () => {
      const res = await fetch(`/api/services/${serviceKey}`);
      if (res.ok) {
        const services: ( { cards: Card[] } & Service )[] = await res.json();
        const arService = services.find(s => s.lang === "ar");
        const enService = services.find(s => s.lang === "en");
        if (!arService || !enService) return;
        setTitle({ ar: arService.title, en: enService.title });
        setDescription({ ar: arService.description, en: enService.description });
        setFetchedCards({ar: arService.cards, en: enService.cards});
      }
    }
    fetchService();
  }, [serviceKey, locale])
  

  const handleCardAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmitCard || !image) return;
    const card = {
      title: {
        ar: cardTitleAr,
        en: cardTitleEn
      },
      description: {
        ar: cardDescriptionAr,
        en: cardDescriptionEn
      },
      image: image,
      imageSource: imageSrc
    }
    setCards([...cards, card]);
    setAddModal(false);
    setEditMode(false);
    setImage(null);
    setImageSrc(null);
    setCardDescriptionAr("");
    setCardDescriptionEn("");
    setCardTitleAr("");
    setCardTitleEn("");
  }

  const handleCardEdit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedCardIndex === null || !canSubmitCard || !image || !imageSrc) return;
    const card = {
      title: {
        ar: cardTitleAr,
        en: cardTitleEn
      },
      description: {
        ar: cardDescriptionAr,
        en: cardDescriptionEn
      },
      image,
      imageSource: imageSrc
    }
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex] = card;
    setCards(updatedCards);
    setAddModal(false);
    setEditMode(false);
    setFetchedCardEditMode(false);
    setImage(null);
    setImageSrc(null);
    setCardDescriptionAr("");
    setCardDescriptionEn("");
    setCardTitleAr("");
    setCardTitleEn("");
  }

  const handleFetchedCardEdit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedCardIndex === null || !fetchedCards[locale as "ar" | "en"][selectedCardIndex] || !imageSrc) return;

    if (image) {
      const card = {
        title: {
          ar: cardTitleAr,
          en: cardTitleEn
        },
        description: {
          ar: cardDescriptionAr,
          en: cardDescriptionEn
        },
        image,
        imageSource: imageSrc
      }
      const updatedCards = [...cards, card];
      setCards(updatedCards);
      setFetchedCards({ ar: fetchedCards.ar.filter((c, i) => i !== selectedCardIndex), en: fetchedCards.en.filter((c, i) => i !== selectedCardIndex) })
    } else {
      const updatedCards = {ar: [...fetchedCards.ar], en: [...fetchedCards.en]};
      updatedCards.ar[selectedCardIndex].title = cardTitleAr;
      updatedCards.en[selectedCardIndex].title = cardTitleEn;
      updatedCards.ar[selectedCardIndex].description = cardDescriptionAr;
      updatedCards.en[selectedCardIndex].description = cardDescriptionEn;
    }
    setAddModal(false);
    setEditMode(false);
    setFetchedCardEditMode(false);
    setImage(null);
    setImageSrc(null);
    setCardDescriptionAr("");
    setCardDescriptionEn("");
    setCardTitleAr("");
    setCardTitleEn("");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    const data = new FormData();
    const serviceCards = cards.map(c => (
      {
        title: {
          ar: c.title.ar,
          en: c.title.en
        },
        description: {
          ar: c.description.ar,
          en: c.description.en
        },
      }
    ));

    const cardsImages = cards.map(c => (
      c.image
    ));

    serviceCards.forEach((card, index) => {
      data.append("cards", JSON.stringify(card));
      data.append("images", cardsImages[index]);
    });

    fetchedCards.en.forEach((card, index) => {
      data.append("uploadedCards", JSON.stringify({
        title: {
          ar: fetchedCards.ar[index].title,
          en: fetchedCards.en[index].title,
        },
        description: {
          ar: fetchedCards.ar[index].description,
          en: fetchedCards.en[index].description,
        },
        image: card.image
      }))
    })

    data.set("title", JSON.stringify(title));
    data.set("description", JSON.stringify(description));
    const res = await fetch(`/api/services/${serviceKey}`, {
      method: "PATCH",
      body: data
    });
    if (res.ok) {
      setCards([]);
      setTitle({ ar: "", en: "" });
      setDescription({ ar: "", en: "" });
      setImage(null);
      setImageSrc(null);
      setCardDescriptionAr("");
      setCardDescriptionEn("");
      setCardTitleAr("");
      setCardTitleEn("");
      setFetchedCards({ ar: [], en: [] })
      router.push("/admin/dashboard/services")
    } else {
      alert(t("invalid data"))
    }
    setLoading(false);
  }



    useEffect(() => {
      if (!image) return;
      const src = URL.createObjectURL(image);
      setImageSrc(src);
    }, [image])
    

  return (
    <div
      className="flex items-center justify-center my-20 px-5 w-full max-w-[1300px]"
    >
      <form className="flex flex-col items-center justify-center w-full gap-5" onSubmit={handleSubmit}>
        <div className="w-full flex gap-5 max-sm:flex-wrap">
          <input
            className="bg-gray-100 w-full p-4 text-start outline-none rounded-md"
            type="text"
            placeholder={`${t("service title")} (${t("english")})`}
            onChange={e => setTitle({ ar: title.ar, en: e.target.value })}
            value={title.en}
          />
          <input
            className="bg-gray-100 w-full p-4 text-start outline-none rounded-md"
            type="text"
            placeholder={`${t("service title")} (${t("arabic")})`}
            onChange={e => setTitle({ ar: e.target.value, en: title.en })}
            value={title.ar}
          />
        </div>
        <textarea
          className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md"
          placeholder={`${t("service description")} (${t("english")})`}
          onChange={e =>
            setDescription({ ar: description.ar, en: e.target.value })}
          value={description.en}
        />
        <textarea
          className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md"
          placeholder={`${t("service description")} (${t("arabic")})`}
          onChange={e =>
            setDescription({ ar: e.target.value, en: description.en })}
          value={description.ar}
        />
        <h1 className="text-2xl my-10">
          {t("service cards")}
        </h1>
        <div className="flex items-center justify-center flex-wrap w-full gap-10">
        {fetchedCards[locale as "ar" | "en"].map((card, index) => (
            <div key={index} className='w-full max-w-96 h-fit min-h-[500px] rounded-md overflow-hidden flex flex-col gap-5 border-2 border-dark items-center justify-between'>
              <div className='w-full h-52 relative'>
                <Image
                  src={card.image}
                  alt="service image"
                  fill
                  objectFit='cover'
                />
              </div>
              <h1 className='text-4xl mx-2 text-main'>{card.title}</h1>
              <p className='mb-10 w-11/12 text-wrap'>{card.description}</p>
              <div className="w-full flex justify-center gap-5 mb-3">
                <button 
                  type="button"
                  className="min-w-32 border-2 border-main p-2 text-center text-main rounded-md font-bold"
                  onClick={() => {
                    setCardTitleAr(fetchedCards.ar[index].title || "");
                    setCardTitleEn(fetchedCards.en[index].title || "");
                    setCardDescriptionAr(fetchedCards.ar[index].description || "");
                    setCardDescriptionEn(fetchedCards.en[index].description || "");
                    setImageSrc(card.image);
                    setAddModal(true);
                    setFetchedCardEditMode(true);
                    setSelectedCardIndex(index);
                  }}
                  >
                  {t("edit")}
                </button>
                <button
                  type="button"
                  className="min-w-32 border-2 border-main p-2 text-center text-main rounded-md font-bold"
                  onClick={() => {
                    setFetchedCards({ar: fetchedCards.ar.filter((c, i) => index !== i), en: fetchedCards.ar.filter((c, i) => index !== i)});
                  }}
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}
          {cards.map((card, index) => (
            <div key={index} className='w-full max-w-96 h-fit min-h-[500px] rounded-md overflow-hidden flex flex-col gap-5 border-2 border-dark items-center justify-between'>
              <div className='w-full h-52 relative'>
                <Image
                  src={card.imageSource}
                  alt="service image"
                  fill
                  objectFit='cover'
                />
              </div>
              <h1 className='text-4xl mx-2 text-main'>{card.title[locale as "en" | "ar"]}</h1>
              <p className='mb-10 w-11/12 text-wrap'>{card.description[locale as "en" | "ar"]}</p>
              <div className="w-full flex justify-center gap-5 mb-3">
                <button 
                  type="button"
                  className="min-w-32 border-2 border-main p-2 text-center text-main rounded-md font-bold"
                  onClick={() => {
                    setCardTitleAr(card.title.ar);
                    setCardTitleEn(card.title.en);
                    setCardDescriptionAr(card.description.ar);
                    setCardDescriptionEn(card.description.en);
                    setImage(card.image);
                    setImageSrc(card.imageSource);
                    setAddModal(true);
                    setEditMode(true);
                    setSelectedCardIndex(index);
                  }}
                  >
                  {t("edit")}
                </button>
                <button
                  type="button"
                  className="min-w-32 border-2 border-main p-2 text-center text-main rounded-md font-bold"
                  onClick={() => {
                    setCards(cards.filter((c, i) => index !== i));
                  }}
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="w-full max-w-96 h-[500px] rounded-md overflow-hidden flex flex-col gap-5 relative border-2 border-dark"
            onClick={() => setAddModal(true)}
            >
            <Image
              src="/icons/add.png"
              alt="add"
              fill
              objectFit="contain"
              className="opacity-30"
              />
          </button>
        </div>
        <input
          type="submit"
          value={submitValue}
          className="w-full bg-main text-background hover:bg-main/80 text-lg p-4 rounded-md cursor-pointer disabled:bg-main/60 disabled:cursor-not-allowed"
          disabled={loading || !canSubmit}
        />
      </form>
      {addModal &&
        <div
          className="w-screen h-screen bg-foreground/20 left-0 top-0 fixed z-50 flex items-center justify-center"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setAddModal(false);
              setEditMode(false);
              setFetchedCardEditMode(false);
              setImage(null);
              setImageSrc(null);
              setCardDescriptionAr("");
              setCardDescriptionEn("");
              setCardTitleAr("");
              setCardTitleEn("");
            }
          }}
        >
          <div className="bg-background w-full h-full max-w-[1000px] max-h-[750px] overflow-auto flex items-start p-2">
            <form className="flex flex-col items-center justify-center w-full gap-5" onSubmit={editMode? handleCardEdit: (fetchedCardEditMode? handleFetchedCardEdit: handleCardAdd)}>
              <input
                className="bg-gray-100 w-full p-4 text-start outline-none rounded-md max-w-96"
                type="text"
                placeholder={`${t("card title")} (${t("english")})`}
                onChange={e => setCardTitleEn(e.target.value)}
                value={cardTitleEn}
              />
              <input
                className="bg-gray-100 w-full p-4 text-start outline-none rounded-md max-w-96"
                type="text"
                placeholder={`${t("card title")} (${t("arabic")})`}
                onChange={e => setCardTitleAr(e.target.value)}
                value={cardTitleAr}
              />
              <textarea
                className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md max-w-96"
                placeholder={`${t("card description")} (${t("english")})`}
                onChange={e => setCardDescriptionEn(e.target.value)}
                value={cardDescriptionEn}
              />
              <textarea
                className="bg-gray-100 w-full h-56 p-4 text-start outline-none rounded-md max-w-96"
                placeholder={`${t("card description")} (${t("arabic")})`}
                onChange={e =>
                  setCardDescriptionAr(e.target.value)}
                value={cardDescriptionAr}
              />
              <div className="w-full max-w-96 h-32 border-2 relative rounded-md border-dashed">
                <label
                  className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer"
                  htmlFor="file-upload"
                >
                  {t("upload card image here")}
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setImage(e.target.files![0])}
                />
              </div>
              {imageSrc &&
                <div className="flex flex-col items-center text-center w-full max-w-96 h-fit gap-4 bg-gray-100 p-2 rounded-md relative">
                  <div className="flex items-center justify-between w-full">
                    <h1 className="overflow-hidden text-ellipsis text-nowrap">
                      {image
                        ? image.name
                        : imageSrc.split("/")[imageSrc.split("/").length - 1]}
                    </h1>
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImageSrc(null);
                      }}
                    >
                      <Image
                        src="/icons/cancel.svg"
                        alt="cancel"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  <div className="relative w-full h-64 rounded-md overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={imageSrc || "Category Image"}
                      fill
                      objectFit="cover"
                      onLoad={() => URL.revokeObjectURL(imageSrc)}
                    />
                  </div>
                </div>}
              <input
                type="submit"
                value={(editMode || fetchedCardEditMode)? t("edit"): t("add")}
                className="w-full max-w-96 bg-main text-background hover:bg-main/80 text-lg p-4 rounded-md cursor-pointer disabled:bg-main/60 disabled:cursor-not-allowed"
                disabled={!canSubmitCard}
              />
            </form>
          </div>
        </div>}
    </div>
  );
}
