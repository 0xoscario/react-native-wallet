/**
 * @format
 */
import React from 'react';
import { BottomNavigation, BottomNavigationProps, ThemeProvider } from '@ui-kitten/components';
import { useBrandTheme } from 'src/theme';

export const BrandBottomNavigation = (props: BottomNavigationProps): React.ReactElement => {
  const brandTheme = useBrandTheme();

  return (
    <ThemeProvider theme={brandTheme}>
      <BottomNavigation {...props}/>
    </ThemeProvider>
  );
};
