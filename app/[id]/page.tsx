"use client";
import { getGifDetailsFetcher } from "@/src/utils/getGifDetailsFetcher";
import { Close, Title } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import useSWR from "swr";

export default function Page({ params }: { params: { id: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const { data, error, isLoading } = useSWR(
    `https://api.giphy.com/v1/gifs/${params.id}?api_key=${apiKey}`,
    getGifDetailsFetcher,
  );

  return (
    <>
      <Close asChild>
        <button
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full outline-none hover:bg-black hover:text-white"
          aria-label="Close"
        >
          <Cross2Icon className="h-6 w-6" />
        </button>
      </Close>
      <div className="flex flex-col gap-6" key={data?.id}>
        <Title className="DialogTitle">
          {error ? "Error" : isLoading || !data ? "Loading..." : data.title}
        </Title>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.url}
          alt={data?.alt}
          className="block max-h-[55vh] object-contain"
        />
      </div>
    </>
  );
}
