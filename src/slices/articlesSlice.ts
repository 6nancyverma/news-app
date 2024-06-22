import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Article } from "../types/types";

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  totalPages: 1,
};

const apiKey = "9b52ff6732bc463fa2f03a41e8eff21a";

const pageSize = 10;

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({
    country,
    topic,
    page,
  }: {
    country: string;
    topic: string;
    page: number;
  }) => {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${topic}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    );
    const data = response.data;
    return { articles: data.articles, totalResults: data.totalResults };
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.totalResults / pageSize);
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default articlesSlice.reducer;
