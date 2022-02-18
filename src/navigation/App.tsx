import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useData, ThemeProvider, TranslationProvider } from '../hooks';
import React from 'react';
import HomePage from './Home';
import AuthStack from './AuthStack';
import { useAuthentication } from '../hooks/useAuthentication';


export default () => {
  const { isDark, theme, setTheme } = useData();
  const { user } = useAuthentication();

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
    'MaiandraGD': theme.assets.MaiandraGD,
    'MaiandraGDSemiBold': theme.assets.MaiandraGDSemiBold,
    'MaiandraGDExtraBold': theme.assets.MaiandraGDExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };
  if (user) {
    return (
      <TranslationProvider>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <StatusBar translucent backgroundColor="transparent" />
          <NavigationContainer theme={navigationTheme}>
            <HomePage />
          </NavigationContainer>
        </ThemeProvider>
      </TranslationProvider>
    );
  }
  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <StatusBar translucent backgroundColor="transparent" />
        <NavigationContainer theme={navigationTheme}>
          <AuthStack />
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );

};
