import axios from "axios";

const API_BASE_URL = "http://localhost:8000/analytics";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchOverview = () => api.get("/overview").then((res) => res.data);
export const fetchTopWebsites = () => api.get("/top-websites").then((res) => res.data);
export const fetchCategories = () => api.get("/categories").then((res) => res.data);
export const fetchInsights = () => api.get("/insights").then((res) => res.data);
export const fetchStreak = () => api.get("/streak").then((res) => res.data);
export const fetchHourlyActivity = () => api.get("/hourly-activity").then((res) => res.data);