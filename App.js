import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens and navigations
import BottomTabNav from './navigations/BottomTabNav';
import Welcome from './Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import { EditProfile } from './screens';
import ResetPassword from './screens/Resetpassword';
import EmergencyContacts from './screens/EmergencyContacts';
import MealPlanner from './screens/MealPlanner';
import EnterMealItems from './screens/EnterMealItems';
import RecordMeal from './screens/RecordMeal';

// Prevent SplashScreen from auto-hiding until ready
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  // State for detecting first app launch
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('@firstLaunch');
        if (value === null) {
          // First launch detected
          await AsyncStorage.setItem('@firstLaunch', 'true');
          setFirstLaunch(true);
        } else {
          // Not the first launch
          setFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setFirstLaunch(false); // Default to not first launch on error
      }
    };

    checkFirstLaunch();
  }, []);

  // Hide SplashScreen after fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Render null until fonts and first launch state are loaded
  if (!fontsLoaded || firstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {firstLaunch ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomTabNavigation" component={BottomTabNav} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
            <Stack.Screen name="MealPlanner" component={MealPlanner} />
            <Stack.Screen name="EnterMealItems" component={EnterMealItems} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="RecordMeal" component={RecordMeal} />
          </>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
