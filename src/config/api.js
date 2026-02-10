const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    console.warn("⚠ VITE_API_URL not found. Using fallback localhost.");
    return "http://localhost:5454";
  }

  return url;
};

export const API_BASE_URL = getApiBaseUrl();

console.log("API URL:", API_BASE_URL);
