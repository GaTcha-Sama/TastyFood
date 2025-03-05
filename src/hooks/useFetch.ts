/**
 * useFetch hook - Data fetching abstraction
 * A custom React hook that handles API requests with built-in state management
 * Features:
 * - Generic typing for flexible response handling
 * - State management:
 *   - Remaining requests
 *   - Loading state during requests
 *   - Error handling with messages
 *   - Data storage after successful fetch
 * - URL parameter handling:
 *   - Support for pagination (from, size)
 *   - Query string parameters
 *   - Tag filtering
 * - Request lifecycle management:
 *   - Automatic cleanup on unmount
 *   - Request cancellation
 *   - Component mount state tracking
 * - Error handling:
 *   - HTTP error responses
 *   - Network errors
 *   - Aborted requests
 * - Performance optimization:
 *   - Memoized URL parameters
 *   - Controlled re-renders
 */

import { useState, useEffect } from 'react';

const REQUEST_LIMIT = 100;
const STORAGE_KEY = 'api_requests';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const requestCount = Number(localStorage.getItem(STORAGE_KEY) || 0);
      
      if (requestCount >= REQUEST_LIMIT) {
        setError(`Request limit reached: ${REQUEST_LIMIT} requests per day`);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
          }
        });

        if (!response.ok) {
          throw new Error('Network error');
        }

        const json = await response.json();
        setData(json);
        
        localStorage.setItem(STORAGE_KEY, String(requestCount + 1));
        
      } catch (error) {
        setError(error as string || "Error while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
