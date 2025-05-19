import { useState, useEffect, createContext, useContext } from 'react';
import { useColorScheme, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  card: string;
  cardHighlight: string;
  overlay: string;
}

export const lightColors: ThemeColors = {
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1e293b',
  textSecondary: '#64748b',
  primary: '#6366f1',
  secondary: '#ec4899',
  accent: '#22c55e',
  border: '#f1f5f9',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f97316',
  card: '#ffffff',
  cardHighlight: '#f8fafc',
  overlay: 'rgba(15, 23, 42, 0.3)',
};

export const darkColors: ThemeColors = {
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  primary: '#818cf8',
  secondary: '#f472b6',
  accent: '#4ade80',
  border: '#334155',
  error: '#f87171',
  success: '#4ade80',
  warning: '#fb923c',
  card: '#1e293b',
  cardHighlight: '#334155',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightColors,
  setTheme: () => {},
  isDark: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const THEME_STORAGE_KEY = '@app_theme';

async function getStoredTheme(): Promise<Theme | null> {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    } else {
      return await AsyncStorage.getItem(THEME_STORAGE_KEY) as Theme;
    }
  } catch (e) {
    console.warn('Failed to get stored theme:', e);
    return null;
  }
}

async function storeTheme(theme: Theme) {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } else {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch (e) {
    console.warn('Failed to store theme:', e);
  }
}

export function useInitTheme(): ThemeContextType {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    getStoredTheme().then(savedTheme => {
      if (savedTheme) {
        setTheme(savedTheme);
      }
    });
  }, []);

  useEffect(() => {
    storeTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return { theme, colors, setTheme, isDark, toggleTheme };
}