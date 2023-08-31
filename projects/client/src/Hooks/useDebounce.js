import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500, minimumLength = 2) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    if (
      minimumLength === 0 ||
      value.length > minimumLength ||
      value.length === 0
    ) {
      const e = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(e);
      };
    }
  }, [value, delay]);
  return debouncedValue;
};
export default useDebounce;
