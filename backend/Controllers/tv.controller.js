import { ENV_VARS } from "../config/envVars.js";
import fetchFromTMDB from "../service/tmd.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTV =
      data.results[Math.floor(Math.random() * data.results?.length)];
    if (data) {
      const randomTV =
        data.results[Math.floor(Math.random() * data.results?.length)];
      return res.status(200).json({ success: true, trailers: randomMovie });
    } else {
      return res.status(404).json({ message: "Not Found", succes: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  const id = req.params.id;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    if (data) {
      return res.status(200).json({ success: true, trailers: data.results });
    } else {
      return res.status(404).json({ message: "Not Found", succes: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvDetails(req, res) {
  const id = req.params.id;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    if (data) {
      return res.status(200).json({ success: true, content: data });
    } else {
      return res.status(404).json({ message: "Not Found", succes: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTvs(req, res) {
  const id = req.params.id;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    if (data) {
      return res.status(200).json({ success: true, similars: data.results });
    } else {
      return res.status(404).json({ message: "Not Found", success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvsByCategory(req, res) {
  const category = req.params.category;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    if (data) {
      return res.status(200).json({ success: true, content: data.results });
    } else {
      return res.status(404).json({ message: "Not Found", succes: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvByGenre(req, res) {
  const genreID = req.params.genreID;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/discover/tv?api_key=${ENV_VARS.TMDB_API_KEY}&with_genres=${genreID}`
    );
    if (data) {
      return res.status(200).json({ success: true, content: data.results });
    } else {
      return res.status(404).json({ message: "Not Found", succes: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
