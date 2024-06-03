export const getGifPreviewFetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  const trendingGifs: GifTrending[] = data.data.map((gif: any) => ({
    id: gif.id,
    url: gif.images.preview_gif.url,
    alt: gif.alt_text,
  }));

  return trendingGifs;
};
