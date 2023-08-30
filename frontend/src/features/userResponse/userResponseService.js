import axios from 'axios'
import { toast } from 'react-toastify'
const API_URL = 'http://localhost:8000/response/'

// Create new user response
const createUserResponse = async (userResponseData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(API_URL, userResponseData, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Get user user responses
const getUserResponses = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL, config)
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Get single user Response
const getUserResponse = async (userResponseId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + userResponseId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Update User Response
const updateUserResponse = async (data, token) => {
 try {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Extract the ID from the data payload
  const response = await axios.patch(API_URL + data.id, data, config)

  return response.data
 } catch (err) {
  let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
 }
}

// Delete single user response
const deleteUserResponse = async (userResponseId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(API_URL + userResponseId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

const userResponseService = {
  createUserResponse,
  getUserResponse,
  getUserResponses,
  updateUserResponse,
  deleteUserResponse
}

export default userResponseService