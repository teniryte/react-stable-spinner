import { useEffect, useState, useRef } from 'react';

export const useStableSpinner = (
  isLoading: boolean,
  {
    after = 300,
    minDuration = 500,
  }: {
    after?: number;
    minDuration?: number;
  } = {
    after: 300,
    minDuration: 500,
  }
) => {
  const [showLoading, setShowLoading] = useState(false);
  const loadingStartedAt = useRef<number | null>(null);
  const loadingShownAt = useRef<number | null>(null);
  const isLoadingLatestRef = useRef<boolean>(isLoading);

  useEffect(() => {
    isLoadingLatestRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      loadingStartedAt.current = performance.now();

      const timeoutId = setTimeout(() => {
        if (!isLoadingLatestRef.current) return;
        setShowLoading(true);
        loadingShownAt.current = performance.now();
      }, after);

      return () => clearTimeout(timeoutId);
    } else {
      if (loadingStartedAt.current && loadingShownAt.current) {
        const spinnerDuration = performance.now() - loadingShownAt.current;
        if (spinnerDuration >= minDuration) {
          setShowLoading(false);
        } else {
          const timeoutId = setTimeout(() => {
            setShowLoading(false);
          }, minDuration - spinnerDuration);

          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [isLoading, after, minDuration]);

  return showLoading;
};

export default useStableSpinner;
