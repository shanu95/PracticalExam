import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSongs } from "../utils/apiService";
import { Song } from "../types/Song";

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  query: string;
  page: number;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
  query: "",
  page: 1,
};

export const getSongs = createAsyncThunk(
  "songs/getSongs",
  async ({ query, page }: { query: string; page: number }) => {
    const searchQuery = query.trim() || "all";
    const results = await fetchSongs(searchQuery, page);
    return results;
  }
);


const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      if (action.payload.trim()) {
        state.songs = [];
      }
    },
    loadMore: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        state.loading = false;
        // state.songs = [...state.songs, ...action.payload];
        state.songs = state.page === 1 ? action.payload : [...state.songs, ...action.payload];
      })
      .addCase(getSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch songs.";
      });
  },
});

export const { setQuery, loadMore } = songsSlice.actions;
export default songsSlice.reducer;
