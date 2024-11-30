import axios from "axios";
import { API_URLS } from "./constants";

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(API_URLS.LOGIN, {
      email: email.trim(),
      password: password.trim(),
    });
    return response.data;
  };

  export const fetchSongs = async (query: string, page: number = 1) => {
    const baseUrl = query ? `https://itunes.apple.com/search?term=${encodeURIComponent(query)}` : API_URLS.ALL_SONGS;
    const url = `${baseUrl}&limit=15&offset=${(page - 1) * 15}`;
    const response = await axios.get(url);
    return response.data.results;
  };
  
