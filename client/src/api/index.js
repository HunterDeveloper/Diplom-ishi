import axios from "axios";

const URL = "http://localhost:5000";

// category
export const getCategory = () => axios.get(`${URL}/api/category`);
export const createCategory = (category) =>
  axios.post(`${URL}/api/category`, category);
export const editCategory = (id, updatedCategory) =>
  axios.put(`${URL}/api/category/${id}`, updatedCategory);
export const deleteCategory = (id) => axios.delete(`${URL}/api/category/${id}`);

// application
export const getApplication = () => axios.get(`${URL}/api/application`);
export const createApplication = (application) =>
  axios.post(`${URL}/api/application`, application);
export const editApplication = (id, updatedApplication) =>
  axios.put(`${URL}/api/application/${id}`, updatedApplication);
export const deleteApplication = (id) =>
  axios.delete(`${URL}/api/application/${id}`);

// admin
export const getAdmin = () => axios.get(`${URL}/api/admin`);
export const createAdmin = (admin) => axios.post(`${URL}/api/admin`, admin);
export const editAdmin = (id, updatedAdmin) =>
  axios.put(`${URL}/api/admin/${id}`, updatedAdmin);
export const deleteAdmin = (id) => axios.delete(`${URL}/api/admin/${id}`);
