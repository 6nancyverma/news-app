import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Article } from "../types/types";

interface SearchState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  articles: [],
  loading: false,
  error: null,
};

const apiKey = import.meta.env.VITE_API_NEWS_API;

export const fetchSearchResults = createAsyncThunk<Article[], string>(
  "search/fetchSearchResults",
  async (query) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      return response.data.articles;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Failed to fetch search results");
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
);

export const selectSearchArticles = (state: RootState) => state.search.articles;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.articles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
