import { BASEURL } from "./constants";

export const get = async (url, headers = {}) => {
  try {
    const response = await fetch(`${BASEURL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      // If response is not ok, throw an error
      throw response;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // If response is JSON, return the parsed JSON
      return await response.json();
    } else {
      // If response is not JSON, return response text
      return await response.text();
    }
  } catch (error) {
    // Re-throw the original error
    throw error;
  }
};

export const post = async (url, postData, headers = {}) => {
  try {
    const response = await fetch(`${BASEURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      // If response is not ok, throw an error
      throw response;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // If response is JSON, return the parsed JSON
      return await response.json();
    } else {
      // If response is not JSON, return response text
      return await response.text();
    }
  } catch (error) {
    // Re-throw the original error
    throw error;
  }
};

export const put = async (url, postData, headers = {}) => {
  try {
    const response = await fetch(`${BASEURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      // If response is not ok, throw an error
      throw response;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // If response is JSON, return the parsed JSON
      return await response.json();
    } else {
      // If response is not JSON, return response text
      return await response.text();
    }
  } catch (error) {
    // Re-throw the original error
    throw error;
  }
};

export const deleted = async (url, headers = {}) => {
  try {
    const response = await fetch(`${BASEURL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      // If response is not ok, throw an error
      throw response;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // If response is JSON, return the parsed JSON
      return await response.json();
    } else {
      // If response is not JSON, return response text
      return await response.text();
    }
  } catch (error) {
    // Re-throw the original error
    throw error;
  }
};
