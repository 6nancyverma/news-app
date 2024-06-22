import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SearchState {
  suggestions: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  suggestions: [],
  loading: false,
  error: null,
};

const apiKey = "9b52ff6732bc463fa2f03a41e8eff21a";

export const fetchSearchSuggestions = createAsyncThunk<string[], string>(
  "search/fetchSearchSuggestions",
  async (query) => {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    );
    return response.data.articles.map(
      (article: { title: string }) => article.title
    );
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSearchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { clearSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
