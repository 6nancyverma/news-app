import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Article } from "../types/types";

interface CountryArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: CountryArticlesState = {
  articles: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const apiKey = import.meta.env.VITE_API_NEWS_API_KEY;
const pageSize = 10;

export const fetchArticlesByCountry = createAsyncThunk(
  "countryArticles/fetchArticlesByCountry",
  async ({ country, page }: { country: string; page: number }) => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    );
    const data = response.data;
    return { articles: data.articles, totalResults: data.totalResults };
  }
);

const countryArticlesSlice = createSlice({
  name: "countryArticles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesByCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.totalResults / pageSize);
      })
      .addCase(fetchArticlesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default countryArticlesSlice.reducer;
