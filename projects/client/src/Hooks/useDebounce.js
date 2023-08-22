import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value.length > 2 || value.length === 0) {
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
