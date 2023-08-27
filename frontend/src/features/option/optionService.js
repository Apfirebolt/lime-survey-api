import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8000/option/";

// Create new option
const createOption = async (optionData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, optionData, config);

    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
    }
    toast.error(errorMessage);
  }
};

// Get user options
const getOptions = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
    }
    toast.error(errorMessage);
  }
};

// Get single Option
const getOption = async (optionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_URL + optionId, config);

    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
    }
    toast.error(errorMessage);
  }
};

// Update Option
const updateOption = async (data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Extract the ID from the data payload
    const response = await axios.patch(API_URL + data.id, data, config);

    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
    }
    toast.error(errorMessage);
  }
};

// Delete single Option
const deleteOption = async (optionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(API_URL + optionId, config);

    return response.data;
  } catch (err) {
    let errorMessage = "Something went wrong";
    if (err.response.status === 401) {
      errorMessage = "Unauthorized access, please login again.";
    }
    toast.error(errorMessage);
  }
};

const optionService = {
  createOption,
  getOption,
  updateOption,
  deleteOption,
  getOptions,
};

export default optionService;
