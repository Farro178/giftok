"use client";
import { GifMasonry } from "@/src/components/GifMasonry";
import { SearchInput } from "@/src/components/SearchInput";
import { getGifPreviewFetcher } from "@/src/utils/getGifPreviewFetcher";
import { Content, Overlay, Portal, Root } from "@radix-ui/react-dialog";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const router = useRouter();

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const pathname = usePathname();

  const hasGifId = pathname.split("/")[1] ? true : false;

  const [isDialogOpen, setIsDialogOpen] = useState(hasGifId);

  const fetcherUrl = searchTerm
    ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=20`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;

  const { data, error, isLoading } = useSWR(fetcherUrl, getGifPreviewFetcher);

  return (
    <html
      lang="en"
      className="bg-green-custom bg-gradient-to-br from-green-custom to-yellow-custom"
    >
      <body className={inter.className}>
        <main className="min-w-dvw mx-auto flex min-h-dvh max-w-7xl flex-col">
          <nav className="flex items-center justify-center py-4">
            <Link className="text-2xl" href="/">
              GifTok
            </Link>
          </nav>
          <div className="flex flex-1 flex-col items-center gap-4">
            <Root
              defaultOpen={isDialogOpen}
              onOpenChange={() => {
                if (isDialogOpen) {
                  setIsDialogOpen(false);
                  router.push(searchTerm ? `/?search=${searchTerm}` : `/`);
                } else {
                  setIsDialogOpen(true);
                }
              }}
            >
              <SearchInput />

              <div className="flex h-full flex-auto items-center justify-center">
                {error ? (
                  <div>Failed to Load</div>
                ) : isLoading || !data ? (
                  <div>Loading...</div>
                ) : data.length == 0 ? (
                  <div>No results found</div>
                ) : (
                  <GifMasonry data={data} />
                )}
              </div>
              <Portal>
                <Overlay className="fixed inset-0 bg-black opacity-70" />
                <Content>
                  <div className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-7xl -translate-x-1/2 -translate-y-1/2 transform animate-fadeInScale rounded-lg bg-white p-6">
                    {children}
                  </div>
                </Content>
              </Portal>
            </Root>
          </div>
        </main>
      </body>
    </html>
  );
}
