import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import surveyService from "./surveyService";

const initialState = {
  surveys: [],
  survey: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new survey
export const createSurvey = createAsyncThunk(
  "surveys/create",
  async (surveyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await surveyService.createSurvey(surveyData, token);
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

// Get Multiple Surveys
export const getSurveys = createAsyncThunk(
  "surveys/getSurvey",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await surveyService.getSurveys(token);
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


// Get single survey
export const getSurvey = createAsyncThunk(
  'surveys/get',
  async (surveyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await surveyService.getSurvey(surveyId, token)
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

// Update single survey
export const updateSurvey = createAsyncThunk(
  "surveys/update",
  async (surveyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await surveyService.updateSurvey(surveyData, token);
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

// Delete survey
export const deleteSurvey = createAsyncThunk(
  "surveys/delete",
  async (surveyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await surveyService.deleteSurvey(surveyId, token);
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

export const surveySlice = createSlice({
  name: "survey",
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
      .addCase(createSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSurvey.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.surveys = action.payload;
      })
      .addCase(getSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.survey = action.payload;
      })
      .addCase(getSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.survey = action.payload;
      })
      .addCase(updateSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        getSurveys()
      })
      .addCase(deleteSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = surveySlice.actions;
export default surveySlice.reducer;