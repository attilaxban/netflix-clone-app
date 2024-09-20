import dotenv from "dotenv";

dotenv.config();


// ENV_VARS helyett logikusabb név


export const ENV_VARS = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
