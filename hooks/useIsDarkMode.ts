import { useState, useEffect } from 'react';

export const useIsDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    setIsDarkMode(isDarkMode);

    console.log('isDarkMode:', isDarkMode);
  }, []);

  return isDarkMode;
};
