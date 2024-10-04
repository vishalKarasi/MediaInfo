import temp from "@assets/images/bg.jpg";

export const sanitiseMedia = (payload, type) => {
  return type === "anime"
    ? {
        mediaType: type,
        id: payload.data.mal_id,
        title: payload.data.title,
        poster: payload.data.images.jpg.large_image_url,
        year: payload.data.year,
        rating: payload.data.score,
      }
    : {
        mediaType: type,
        id: payload.imdbID,
        title: payload.Title,
        poster: payload.Poster === "N/A" ? temp : payload.Poster,
        year: payload.Year,
        rating: payload.imdbRating,
      };
};
