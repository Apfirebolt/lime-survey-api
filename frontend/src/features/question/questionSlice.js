import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "./questionService";

const initialState = {
  questions: [],
  question: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new question
export const createQuestion = createAsyncThunk(
  "questions/create",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.createQuestion(questionData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Multiple Questions
export const getQuestions = createAsyncThunk(
  "questions/getQuestion",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.getQuestions(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get single question
export const getQuestion = createAsyncThunk(
  'questions/get',
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await questionService.getQuestion(questionId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update single question
export const updateQuestion = createAsyncThunk(
  "questions/update",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.updateQuestion(questionData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete question
export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.deleteQuestion(questionId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetVariables: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.question = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.question = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        getQuestions()
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = questionSlice.actions;
export default questionSlice.reducer;