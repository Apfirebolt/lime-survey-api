import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import surveyReducer from './features/survey/surveySlice'
import questionReducer from './features/question/questionSlice'
import optionReducer from './features/option/optionSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    survey: surveyReducer,
    question: questionReducer,
    option: optionReducer,
  },
})