import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import optionService from "./optionService";

const initialState = {
  options: [],
  option: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new option
export const createOption = createAsyncThunk(
  "options/create",
  async (optionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await optionService.createOption(optionData, token);
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

// Get Multiple Options
export const getOptions = createAsyncThunk(
  "options/getOption",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await optionService.getOptions(token);
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


// Get single option
export const getOption = createAsyncThunk(
  'options/get',
  async (optionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await optionService.getOption(optionId, token)
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

// Update single option
export const updateOption = createAsyncThunk(
  "options/update",
  async (optionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await optionService.updateOption(optionData, token);
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

// Delete option
export const deleteOption = createAsyncThunk(
  "options/delete",
  async (optionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await optionService.deleteOption(optionId, token);
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

export const optionSlice = createSlice({
  name: "option",
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
      .addCase(createOption.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOption.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createOption.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.options = action.payload;
      })
      .addCase(getOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOption.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOption.fulfilled, (state, action) => {
        state.isLoading = false;
        state.option = action.payload;
      })
      .addCase(getOption.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOption.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOption.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.option = action.payload;
      })
      .addCase(updateOption.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOption.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOption.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        getOptions()
      })
      .addCase(deleteOption.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = optionSlice.actions;
export default optionSlice.reducer;