import { ENV_VARS } from "../config/envVars.js";


export const fetchFromTMDB = async (url) => {
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
			}

		})
		if (response.ok) {
			const data = await response.json();
			return data
		}
		else {
			throw new Error("Failed to fetch data from TMDB" + response.statusText);
		}
	} catch (error) {
		throw new Error(error.message)
	}
}

export default fetchFromTMDB