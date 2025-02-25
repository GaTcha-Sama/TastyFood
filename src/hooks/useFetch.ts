/**
 * useFetch hook - Data fetching abstraction
 * A custom React hook that handles API requests with built-in state management
 * Features:
 * - Generic typing for flexible response handling
 * - State management:
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

import { useState, useEffect, useMemo } from 'react';

type FetchProps = {
  url: string;
  params?: {
    from?: number;
    size?: number;
    tags?: string;
    query?: string;
  };
  options?: RequestInit;
};

type FetchResult<T> = {
  data: T | undefined;
  loading: boolean;
  error: string | undefined;
};

export function useFetch<T>({ url, params, options }: FetchProps): FetchResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const memoizedParams = useMemo(() => {
    return params ? new URLSearchParams(params as Record<string, string>) : '';
  }, [params]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const fullUrl = `${url}${memoizedParams ? `?${memoizedParams}` : ''}`;
        
        const response = await fetch(fullUrl, {
          ...options,
          signal: controller.signal
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }
        
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        if (isMounted) {
          console.error('Fetch error:', error);
          setError((error as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, memoizedParams, options]);

  return { data, loading, error };
}