import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import surveyReducer from './features/survey/surveySlice'
import questionReducer from './features/question/questionSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    survey: surveyReducer,
    question: questionReducer,
  },
})