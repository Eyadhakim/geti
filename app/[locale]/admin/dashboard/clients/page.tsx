"use client";
import DeleteModal from "@/components/dashboard/DeleteModal";
import UploadedImages from "@/components/dashboard/small-units/UploadedImages";
import { Client } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Clients() {
  const t = useTranslations("Admin");

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesSources, setImagesSources] = useState<string[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("/api/clients");
      if (res.ok) setClients(await res.json());
    };
    fetchClients();
  }, []);

  useEffect(
    () => {
      if (images.length === 0) return;
      const sources: string[] = [];
      images.forEach(image => {
        const src = URL.createObjectURL(image);
        sources.push(src);
      });
      setImagesSources(sources);
    },
    [images]
  );

  const handleSubmit = async () => {
    if (images.length === 0) return;
    const data = new FormData();
    setLoading(true);
    images.forEach(image => {
      data.append("images", image);
    });
    const res = await fetch("/api/clients", {
      method: "POST",
      body: data
    });
    if (res.ok) location.reload();
    else alert(t("invalid data"));
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedClient) return;
    console.log(selectedClient);
    const res = await fetch(`/api/clients/${selectedClient.id}`, {
      method: "DELETE"
    });
    if (res.ok) location.reload();
    else alert(t("server error"));
  };

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-20 my-20 w-full">
      <h1 className="text-5xl text-main">
        {t("clients management")}
      </h1>
      <button
        className="min-w-40 p-4 bg-main text-background transition hover:opacity-70 rounded-lg shadow-lg text-lg font-bold text-center"
        onClick={() => setAddModal(true)}
      >
        {t("add client")}
      </button>
      {clients.length !== 0
        ? <div className="flex items-center justify-center gap-5 w-full flex-wrap">
            {clients.map((client, index) =>
              <div key={index} className="flex flex-col gap-2">
                <div className="relative w-64 h-32 border-2 border-foreground">
                  <Image
                    src={client.logo}
                    alt={index.toString()}
                    fill
                    objectFit="cover"
                  />
                </div>
                
                  <button
                    onClick={() => {
                      setDeleteModal(true);
                      setSelectedClient(client);
                    }}
                    className="w-full border-2 border-foreground p-2 flex items-center justify-evenly"
                  >
                    <Image
                      src="/icons/delete.svg"
                      alt="delete"
                      width={25}
                      height={25}
                    />
                    <p>
                      {t("delete")}
                    </p>
                  </button>
              </div>
            )}
          </div>
        : <p className="text-mainGray text-xl">
            {t("no clients yet")}
          </p>}
      {addModal &&
        <div
          className="fixed w-screen h-screen left-0 top-0 bg-foreground/20 flex items-center justify-center z-50"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setAddModal(false);
            }
          }}
        >
          <div className="max-w-[1000px] max-h-[1000px] w-full h-3/4 min-h-96 bg-background flex flex-col items-center justify-start rounded-md overflow-auto p-2 gap-5">
            <div className="w-full max-w-64 min-h-32 border-2 border-dashed relative rounded-md flex items-center justify-center">
              <label
                className="absolute left-0 top-0 w-full h-full flex items-center justify-center cursor-pointer"
                htmlFor="file-upload"
              >
                {t("upload clients logos here")}
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="hidden"
                multiple
                onChange={e => {
                  const files = Array.from(e.target.files!);
                  const filesSet = files.filter(
                    (file, index, self) =>
                      index === self.findIndex(f => f.name === file.name)
                  );
                  if (files.length !== filesSet.length)
                    alert("some images are repeated");
                  let isRepeated = false;
                  images.forEach(image => {
                    filesSet.forEach((file, index) => {
                      if (image.name === file.name) {
                        isRepeated = true;
                        filesSet.splice(index, 1);
                      }
                    });
                  });
                  if (isRepeated) alert(t("some images are already uploaded"));
                  setImages([...images, ...filesSet]);
                }}
              />
            </div>
            <UploadedImages
              images={images}
              setImages={setImages}
              imagesSources={imagesSources}
              setImagesSources={setImagesSources}
            />
            <div className="w-full flex justify-center gap-10">
              <button
                className="bg-main text-background p-2 min-w-32 text-xl font-bold rounded-md hover:bg-main/80 disabled:cursor-not-allowed disabled:bg-main/60"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? `${t("submitting")}...` : t("submit")}
              </button>
              <button
                className="border-main border-2 p-2 min-w-32 text-xl font-bold rounded-md hover:bg-foreground/10"
                onClick={() => setAddModal(false)}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>}

      {deleteModal &&
        <DeleteModal
          handleCancelClick={() => setDeleteModal(false)}
          handleSubmitClick={handleDelete}
        />}
    </div>
  );
}
