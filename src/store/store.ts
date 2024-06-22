import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../slices/articlesSlice";
import weatherReducer from "../slices/weatherSlice";
import searchReducer from "../slices/searchSlice";
import countryArticlesReducer from "../slices/countryArticlesSlice";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    weather: weatherReducer,
    search: searchReducer,
    countryArticles: countryArticlesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
