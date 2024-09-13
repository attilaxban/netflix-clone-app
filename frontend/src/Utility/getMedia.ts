/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMedia = async (endpoint: string, setter: any) => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setter(data.content);
    } else {
      console.error("Failed to fetch movies");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
