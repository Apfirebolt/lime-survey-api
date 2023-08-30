import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userResponseService from "./userResponseService";

const initialState = {
  responses: [],
  response: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new response
export const createUserResponse = createAsyncThunk(
  "responses/create",
  async (userResponseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await userResponseService.createUserResponse(userResponseData, token);
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

// Get Multiple responses
export const getUserResponses = createAsyncThunk(
  "response/getUserResponse",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await userResponseService.getUserResponses(token);
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


// Get single response
export const getResponse = createAsyncThunk(
  'response/get',
  async (responseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await userResponseService.getUserResponse(responseId, token)
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

// Update single response
export const updateUserResponse = createAsyncThunk(
  "responses/update",
  async (responseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await userResponseService.updateUserResponse(responseData, token);
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

// Delete User Response
export const deleteUserResponse = createAsyncThunk(
  "response/delete",
  async (responseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      console.log('Before API request ', responseId)
      return await userResponseService.deleteUserResponse(responseId, token);
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

export const userResponseSlice = createSlice({
  name: "userResponse",
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
      .addCase(createUserResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserResponse.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log('State is: ', state.isSuccess)
      })
      .addCase(createUserResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserResponses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserResponses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responses = action.payload;
      })
      .addCase(getUserResponses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
      })
      .addCase(getResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.response = action.payload;
      })
      .addCase(updateUserResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUserResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        getUserResponses()
      })
      .addCase(deleteUserResponse.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = userResponseSlice.actions;
export default userResponseSlice.reducer;