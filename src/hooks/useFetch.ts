import { useState, useEffect } from 'react';

type FetchProps = {
  url: string;
  params?: {
    from?: number;
    size?: number;
    tags?: string;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = params ? new URLSearchParams(params as Record<string, string>) : '';
        const fullUrl = `${url}${queryParams ? `?${queryParams}` : ''}`;
        
        console.log('Fetching URL:', fullUrl);  // Debug URL
        console.log('Options:', options);       // Debug options
        
        const response = await fetch(fullUrl, options);
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Fetch error:', error); 
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params, options]);

  return { data, loading, error };
}