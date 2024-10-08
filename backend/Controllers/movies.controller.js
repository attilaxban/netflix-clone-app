import { ENV_VARS } from "../config/envVars.js";
import fetchFromTMDB from "../service/tmd.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US"
    );

    if (data) {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results?.length)];
      return res.status(200).json({ success: true, trailers: randomMovie });
    } else {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results?.length) +1 ];
      return res.status(200).json({ success: true, trailers: randomMovie });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieTrailers(req, res) {
  const id = req.params.id;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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

export async function getMovieDetails(req, res) {
  const id = req.params.id;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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

export async function getSimilarMovies(req, res) {
	const id = req.params.id;
	try {
	  const data = await fetchFromTMDB(
		`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
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
//prefix env var-nak
export async function getMoviesByCategory(req, res) {
  const category = req.params.category;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByGenres(req, res) {
  const genreID = req.params.genreID;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/discover/movie?api_key=${ENV_VARS.TMDB_API_KEY}&with_genres=${genreID}`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching TV by genre:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
