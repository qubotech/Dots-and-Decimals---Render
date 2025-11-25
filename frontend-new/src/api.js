import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000, // 15 second timeout for all requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Named export
export { API };

// Default export
export default API;
