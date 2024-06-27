// useApi.ts
import { useState } from 'react';

interface ApiHook<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    callApi: (url: string, options?: RequestInit) => Promise<void>;
}

export function useApi<T>(): ApiHook<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const callApi = async (url: string, options?: RequestInit) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(url, options);
            const result = (await response.json()) as T;
            setData(result);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, isError, callApi };
}
