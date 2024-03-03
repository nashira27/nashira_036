import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeList: [],
  recipe: {},
  loading: false,
  error: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    filterRecipeStart: (state) => {
      state.loading = true;
    },
    filterRecipeSuccess: (state, action) => {
      state.recipeList = action.payload;
      state.loading = false;
      state.error = false;
    },
    filterRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getRecipeStart: (state) => {
      state.loading = true;
    },
    getRecipeSuccess: (state, action) => {
      state.recipe = action.payload;
      state.loading = false;
      state.error = false;
    },
    getRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRecipeStart: (state) => {
      state.loading = true;
    },
    updateRecipeSuccess: (state, action) => {
      state.recipe = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRecipeStart: (state) => {
      state.loading = true;
    },
    deleteRecipeSuccess: (state, action) => {
      state.goal = {};
      state.loading = false;
      state.error = false;
    },
    deleteRecipeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRecipeFailure,
  getRecipeSuccess,
  getRecipeStart,
  filterRecipeFailure,
  filterRecipeStart,
  filterRecipeSuccess,
  updateRecipeFailure,
  updateRecipeStart,
  updateRecipeSuccess,
  deleteRecipeFailure,
  deleteRecipeStart,
  deleteRecipeSuccess,
} = recipeSlice.actions;
export default recipeSlice.reducer;
