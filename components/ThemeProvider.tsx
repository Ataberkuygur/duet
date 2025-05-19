import { PropsWithChildren } from 'react';
import { ThemeContext, useInitTheme } from '@/hooks/useTheme';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const themeContext = useInitTheme();

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
}