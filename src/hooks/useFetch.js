// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/hooks/useFetch.js
// PURPOSE: A reusable custom hook for fetching data from the API.
//
// WITHOUT THIS HOOK: Every component would repeat the same loading/error/data
//   state management, the same useEffect, the same try/catch.
//
// WITH THIS HOOK: One line replaces all of that:
//   const { data, loading, error } = useFetch('/projects');
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const useFetch = (url) => {
  // data:    The successful response data (null until fetched)
  // loading: True while the request is in progress
  // error:   The error message if the request failed
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback memoizes this function so it's only recreated when "url" changes,
  // preventing unnecessary re-renders in the useEffect below.
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // api is our pre-configured Axios instance (prepends base URL + auth headers)
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      // err.response?.data?.message: error from our Express server
      // err.message: fallback if there's no response (e.g., network offline)
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      // "finally" runs whether the request succeeded or failed
      setLoading(false);
    }
  }, [url]);

  // useEffect triggers the fetch when the component mounts, or when the URL changes
  useEffect(() => {
    if (url) fetchData();
  }, [fetchData, url]);

  // "refetch" lets components manually re-trigger the fetch (e.g., after form submit)
  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
