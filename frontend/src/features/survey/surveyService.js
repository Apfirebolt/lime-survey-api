import axios from 'axios'
import { toast } from 'react-toastify'
const API_URL = 'http://localhost:8000/survey/'

// Create new survey
const createSurvey = async (surveyData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(API_URL, surveyData, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Get user surveys
const getSurveys = async (token) => {
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

// Get single Survey
const getSurvey = async (surveyId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + surveyId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Update Survey
const updateSurvey = async (data, token) => {
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

// Delete single Survey
const deleteSurvey = async (surveyId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + surveyId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

const surveyService = {
  createSurvey,
  getSurvey,
  updateSurvey,
  deleteSurvey,
  getSurveys,
}

export default surveyService