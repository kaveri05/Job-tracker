import axios from "axios";

const API_BASE = "https://job-tracker-backend-theta.vercel.app/api";

export const getJobs = () => {
  return axios.get(`${API_BASE}/jobs`);
};

export const addJob = (job) => {
  return axios.post(`${API_BASE}/jobs`, job);
};

export const updateJob = (id, job) => {
  return axios.put(`${API_BASE}/jobs/${id}`, job);
};

export const deleteJob = (id) => {
  return axios.delete(`${API_BASE}/jobs/${id}`);
};