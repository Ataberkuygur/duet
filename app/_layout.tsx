import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { View } from 'react-native';
import { SplashScreen } from 'expo-router';
import ThemeProvider from '@/components/ThemeProvider';
import { useTheme } from '@/hooks/useTheme';
import SharedTransition from '@/components/SharedTransition';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isDark, colors } = useTheme();
  
  return (
    <SharedTransition>
      <Stack 
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
        <Stack.Screen 
          name="settings" 
          options={{ 
            headerShown: true,
            headerTitle: 'Settings',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              color: colors.text,
              fontFamily: 'Inter-SemiBold',
              fontSize: 18,
            },
            headerTintColor: colors.text,
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="subscription" 
          options={{ 
            headerShown: true,
            headerTitle: 'Subscription',
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: {
              color: colors.text,
              fontFamily: 'Inter-SemiBold',
              fontSize: 18,
            },
            headerTintColor: colors.text,
            presentation: 'modal',
          }} 
        />
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SharedTransition>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Inter-ExtraBold': Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}