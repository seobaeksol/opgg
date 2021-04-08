import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSummoner } from "./api/summoner";
import { AppThunk, RootState } from "./index";

export interface SummonerInfoState {
  searchHistory: string[];
  currentSummoner: string;
}

const initialState: SummonerInfoState = {
  searchHistory: [],
  currentSummoner: "Hide on bush",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        (val) => action.payload !== val
      );
      state.searchHistory.push(action.payload);

      if (state.searchHistory.length > 5) {
        delete state.searchHistory[0];
      }
    },
    removeHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        (val) => action.payload !== val
      );
    },
    clearHistory: (state) => {
      state.searchHistory = [];
    },
    setCurrentSummoner: (state, action: PayloadAction<string>) => {
      state.currentSummoner = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  addHistory,
  removeHistory,
  clearHistory,
  setCurrentSummoner,
} = commonSlice.actions;

export const selectCurrentSummoner = (state: RootState) =>
  state.common.currentSummoner;

export const selectSearchHistory = (state: RootState) =>
  state.common.searchHistory;

export const searchSummoner = (summonerName: string): AppThunk => (
  dispatch,
  getState
) => {
  if (summonerName) {
    dispatch(getSummoner(summonerName));
    dispatch(addHistory(summonerName));
    dispatch(setCurrentSummoner(summonerName));
  }
};

export default commonSlice.reducer;