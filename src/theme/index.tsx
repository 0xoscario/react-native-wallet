/**
 * @format
 */
import React, { PropsWithChildren } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { appMappings, appThemes } from 'src/theme/app-theming';
import { ThemeName } from 'src/utils/types';

interface ContextType {
  themeName: Exclude<ThemeName, 'brand'>;
}

const ThemeContext = React.createContext<ContextType | null>(null);

export function useBrandTheme() {
  const context = React.useContext(ThemeContext)!;
  return {
    ...appThemes.eva[context.themeName],
    ...appThemes.eva.brand[context.themeName]
  };
}

interface ThemeProviderProps extends PropsWithChildren<any> {
  themeName: Exclude<ThemeName, 'brand'>;
}

export function ThemeProvider({ themeName, children }: ThemeProviderProps) {
  const value: ContextType = {
    themeName
  };
  const mapping: any = appMappings.eva;
  const theme = appThemes.eva[themeName];

  return (
    <ThemeContext.Provider value={value}>
      <ApplicationProvider {...mapping} theme={theme}>
        {children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
}
