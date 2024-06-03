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
        <main className=" max-w-7xl mx-auto min-h-dvh min-w-dvw flex flex-col">
          <nav className="flex items-center justify-center py-4">
            <Link className="text-2xl" href="/">
              GifTok
            </Link>
          </nav>
          <div className="flex-1 flex flex-col gap-4 items-center">
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

              <div className="flex items-center justify-center h-full flex-auto">
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
                <Overlay className="fixed inset-0 opacity-70 bg-black" />
                <Content>
                  <div className="bg-white rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-7xl max-h-[85vh] p-6 animate-fadeInScale">
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
