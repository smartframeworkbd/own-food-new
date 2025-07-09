import { useState, useEffect } from 'react';

/**
 * A custom hook that debounces a function.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} The debounced function.
 */
const useDebounce = (callback, delay) => {
  const [debouncedCallback, setDebouncedCallback] = useState(() => callback);

  useEffect(() => {
    setDebouncedCallback(() => callback);
  }, [callback]);

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedCallback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedCallback, delay]);

  return debouncedCallback;
};

export default useDebounce;
