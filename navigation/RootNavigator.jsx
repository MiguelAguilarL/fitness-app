import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import StartScreen from '../app/Home/StartScreen';
import QuestionnaireScreen from '../app/Questionnaire/QuestionnaireScreen';
import QuestionnaireSummaryScreen from '../app/Questionnaire/QuestionnaireSummaryScreen';
import HomeScreen from '../app/Home/HomeScreen';
import RoutinesScreen from '../app/Routine/RoutinesScreen';
import CreateRoutineScreen from '../app/Routine/CreateRoutineScreen';
import SelectExercisesScreen from '../app/Routine/SelectExercisesScreen';
import RoutineDetailScreen from '../app/Routine/RoutineDetailScreen';
import ActiveExerciseScreen from '../app/Fitness/ActiveExerciseScreen';
import RestScreen from '../app/Fitness/RestScreen';
import PerformanceScreen from '../app/Profile/PerformanceScreen';
import ProfileScreen from '../app/Profile/ProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 4,
          fontWeight: '700',
        },
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 12,
          elevation: 0,
          backgroundColor: '#071029',
          borderTopWidth: 0,
          height: 72,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.16,
          shadowRadius: 16,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'circle';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'FitnessHome') {
            iconName = 'compass';
          } else if (route.name === 'ActiveExercise') {
            iconName = 'activity';
          } else if (route.name === 'Performance') {
            iconName = 'trending-up';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Feather name={iconName} size={22} color={focused ? '#d6a6ff' : '#7b728e'} />;
        },
        tabBarActiveTintColor: '#d6a6ff',
        tabBarInactiveTintColor: '#7b728e',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'INICIO' }} />
      <Tab.Screen name="FitnessHome" component={RoutinesScreen} options={{ tabBarLabel: 'RUTINAS' }} />
      <Tab.Screen name="ActiveExercise" component={ActiveExerciseScreen} options={{ tabBarLabel: 'ENTRENAR' }} />
      <Tab.Screen name="Performance" component={PerformanceScreen} options={{ tabBarLabel: 'PROGRESO' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'PERFIL' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="QuestionnaireSummary" component={QuestionnaireSummaryScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Rest" component={RestScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="CreateRoutine" component={CreateRoutineScreen} />
          <Stack.Screen name="SelectExercises" component={SelectExercisesScreen} />
          <Stack.Screen name="RoutineDetail" component={RoutineDetailScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
