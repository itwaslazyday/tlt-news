import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteArticle, fetchArticle, getArticles, patchArticle } from "api";
import { Article, State } from "types/types";

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (_, { rejectWithValue }) => {
  try {
    let response = await getArticles();

    if (response.ok) {
      let json = await response.json();

      return json;
    } else {
      response.text().then((err: string) => {
        throw new Error(`Error due loading articles: ${err}`);
      });
    }
  } catch (error) {
    rejectWithValue(error);
  }
});

export const addPostThunk = createAsyncThunk("articles/addArticle", async (data: Article, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetchArticle(data);
    if (!response.ok) {
      response.text().then((err: string) => {
        throw new Error(`Error during adding a post: ${err}`);
      });
    } else {
      const article = await response.json();
      article && dispatch(addArticle({ ...article }));
    }
  } catch (error) {
    rejectWithValue(error);
  }
});

export const deletePostThunk = createAsyncThunk("articles/deleteArticle", async (id: number, { dispatch, rejectWithValue }) => {
  try {
    const response = await deleteArticle(id);

    if (!response.ok) {
      response.text().then((err: string) => {
        throw new Error(`Error during deleting a post: ${err}`);
      });
    } else {
      dispatch(removeArticle(id));
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const patchPostThunk = createAsyncThunk("articles/patchArticle", async (data: Article, { dispatch, rejectWithValue }) => {
  try {
    const response = await patchArticle(data);

    if (!response.ok) {
      response.text().then((err: string) => {
        throw new Error(`Error during changing a post: ${err}`);
      });
    } else {
      const article = await response.json();
      article && dispatch(changeArticle({ ...article }));
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState: State = {
  articles: [],
  loading: true,
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle(state, action: PayloadAction<Article>) {
      state.articles = [
        {
          id: new Date().getTime(),
          title: action.payload.title,
          body: action.payload.body,
        },
        ...state.articles,
      ];
    },
    removeArticle(state, action: PayloadAction<number>) {
      state.articles = state.articles.filter((item) => item.id !== action.payload);
    },
    changeArticle(state, action: PayloadAction<Article>) {
      let article = state.articles.find((item) => item.id === action.payload.id);

      if (!article) return;

      for (let key in action.payload) {
        article[key as keyof Article] = action.payload[key as never];
      }
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    addCase(addPostThunk.pending, (state) => {
      state.loading = true;
    });
    addCase(deletePostThunk.pending, (state) => {
      state.loading = true;
    });
    addCase(patchPostThunk.pending, (state) => {
      state.loading = true;
    });

    addCase(fetchArticles.fulfilled, (state, { payload }) => {
      state.articles = payload;
      state.loading = false;
    });
    addCase(addPostThunk.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(deletePostThunk.fulfilled, (state) => {
      state.loading = false;
    });
    addCase(patchPostThunk.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { removeArticle, addArticle, changeArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
