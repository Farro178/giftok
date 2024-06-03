import { Trigger } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Masonry } from "react-plock";

interface GifMasonryProps {
  data: GifTrending[];
}

export function GifMasonry({ data }: GifMasonryProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  return (
    <Masonry
      items={data}
      config={{
        columns: [2, 3, 4],
        gap: [12, 16, 20],
        media: [640, 1024, 1280],
      }}
      render={(item) => (
        <MotionLink
          className="scale-110"
          key={item.id}
          href={searchTerm ? `/${item.id}?search=${searchTerm}` : `/${item.id}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circInOut" }}
        >
          <Trigger asChild>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full hover:animate-scale-hover"
              style={{ animationFillMode: "forwards" }}
              src={item.url}
              alt={item.alt}
            />
          </Trigger>
        </MotionLink>
      )}
    />
  );
}

const MotionLink = motion(Link);
