import { useCallback, useEffect, useState } from 'react';

import axiosClient from '@/api/config/axiosClient';
import type { ApiParams } from '@/types/tmdb';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: ApiParams) => void;
}

const useFetch = <T,>(url: string, initialParams: ApiParams = {}): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ApiParams>(initialParams);

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get<T>(url, { params });
      setData(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback((newParams: ApiParams = {}) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  return { data, loading, error, refetch };
};

export default useFetch;
