import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../app/StartScreen';
import QuestionnaireScreen from '../app/QuestionnaireScreen';
import HomeScreen from '../app/HomeScreen';
import FitnessHomeScreen from '../app/FitnessHomeScreen';
import ActiveExerciseScreen from '../app/ActiveExerciseScreen';
import RestScreen from '../app/RestScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FitnessHome" component={FitnessHomeScreen} />
        <Stack.Screen name="ActiveExercise" component={ActiveExerciseScreen} />
        <Stack.Screen name="Rest" component={RestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
