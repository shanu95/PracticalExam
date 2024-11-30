import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types/Song";
import { MAX_RECENTLY_PLAYED } from "../utils/constants";

interface RecentlyPlayedState {
  songs: Song[];
}

const initialState: RecentlyPlayedState = {
  songs: [],
};

const recentlyPlayedSlice = createSlice({
  name: "recentlyPlayed",
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<Song>) => {
     
      const exists = state.songs.find(
        (song) => song.trackId === action.payload.trackId
      );
      if (!exists) {
        state.songs.unshift(action.payload);
       
        if (state.songs.length > MAX_RECENTLY_PLAYED) {
          state.songs.pop();
        }
      }
    },
  },
});

export const { addSong } = recentlyPlayedSlice.actions;
export default recentlyPlayedSlice.reducer;
