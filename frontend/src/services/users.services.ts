import { User } from "../types/User"
import axiosInstance from "../utils/axiosInstance"

export const signUpService = async (
  user: User
) => {
  try {
    await axiosInstance.post('/auth/signup', user)
    return true
  } catch (error) {
    return error
  }
}

export const signInService = async (
  user: User
) => {
  try {
    await axiosInstance.post('/auth/signin', user)
    return true
  } catch (error) {
    return error
  }
}

export const signOutService = async () => {
  try {
    await axiosInstance.post('/auth/signout')
    
    return false
  } catch (error) {
    return error
  }
}

export const verifyAuth = async() => {
  try {
    const { data } = await axiosInstance.get('/auth/verify')
    return data.authenticated
  } catch (error) {
    return error
  }
}