import axiosInstance from "../utils/axiosInstance";

export const getAllCategoriesService = async () => {
  try {
    const { data } = await axiosInstance.get('/categories');
    return data;
  } catch (error) {
    return error;
  }
}