export const getGifDetailsFetcher = async (url: string) => {
  const response = await fetch(url);
  const { data } = await response.json();

  const gifDetails: GifDetails = {
    id: data.id,
    url: data.images.original.url,
    title: data.title,
    alt: data.alt_text,
  };

  return gifDetails;
};
