/**
 * Theme definitions for the application
 */

export const themes = {
  tomato: {
    name: 'Tomato Red',
    primary: '#FF6B47',
    primaryDark: '#E55A3C',
    primaryLight: '#FF8A6B',
    secondary: '#4ECDC4',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    shadow: 'rgba(0, 0, 0, 0.1)',
    break: '#4ECDC4',
    breakLight: '#7EDDD6',
  },
  mint: {
    name: 'Mint Green',
    primary: '#2ECC71',
    primaryDark: '#27AE60',
    primaryLight: '#58D68D',
    secondary: '#3498DB',
    background: '#F8FDF8',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    shadow: 'rgba(0, 0, 0, 0.1)',
    break: '#3498DB',
    breakLight: '#5DADE2',
  },
  dark: {
    name: 'Midnight Dark',
    primary: '#FF6B47',
    primaryDark: '#E55A3C',
    primaryLight: '#FF8A6B',
    secondary: '#4ECDC4',
    background: '#1A1A1A',
    surface: '#2C2C2C',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    shadow: 'rgba(0, 0, 0, 0.3)',
    break: '#4ECDC4',
    breakLight: '#7EDDD6',
  },
} as const;

export type ThemeKey = keyof typeof themes;
export type ThemeColors = typeof themes[ThemeKey];

/**
 * Apply theme CSS variables to the document
 */
export const applyTheme = (themeName: ThemeKey): void => {
  const theme = themes[themeName];
  const root = document.documentElement;
  
  Object.entries(theme).forEach(([key, value]) => {
    if (key !== 'name') {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    }
  });
};