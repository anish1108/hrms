import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Unified error handler
 * Converts Django errors into readable messages
 */
export const getErrorMessage = (error) => {
  if (error.response) {
    const data = error.response.data;

    // Our backend sends { error: "message" }
    if (typeof data === "object" && data.error) {
      return data.error;
    }

    // Django default error
    if (typeof data === "string") {
      return data;
    }

    return "Request failed with server error";
  }

  if (error.request) {
    return "Server not reachable. Check backend.";
  }

  return "Something went wrong";
};

export default API;
