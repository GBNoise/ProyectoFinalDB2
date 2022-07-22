import React, { useEffect, useState } from 'react';

export const useSearchDelay = (val: string, delay: number) => {
  const [value, setValue] = useState(val);

  useEffect(() => {
    const tOut = setTimeout(() => {
      setValue(val);
    }, delay);

    return () => clearTimeout(tOut);
  }, [val]);

  return value;
};
