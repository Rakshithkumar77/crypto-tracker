import api from "./api";

// ✅ CORRECT PATHS
export const getMarkets = ({ currency, page, perPage }) => {
  return api.get("/crypto/markets", {
    params: {
      currency,
      page,
      per_page: perPage,
    },
  });
};

export const searchCoins = (query) => {
  return api.get("/crypto/search", {
    params: { query },
  });
};