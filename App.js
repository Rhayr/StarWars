// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from './src/constants/styles';

import Principal from './src/screens/Principal';
import CharacterDetails from './src/screens/CharacterDetails';
import Starships from './src/screens/Starships';
import Movies from './src/screens/Movies';
import About from './src/screens/About';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primaryColor,
            },
            headerTintColor: GlobalStyles.colors.secondaryColor,
          headerTitleAlign: 'center', 
          headerTitleStyle: {
            fontSize: 24, 
          },
          }}
      initialRouteName="Principal">
        <Stack.Screen 
          name="Principal" 
          component={Principal} 
          options={({ navigation }) => ({
            title: 'Personagens',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('About')}
                style={styles.headerButton}>
                <Text style={styles.headerButtonText}>?</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="CharacterDetails" 
          component={CharacterDetails} 
          options={{ title: 'Detalhes' }}
        />
        <Stack.Screen 
          name="Starships" 
          component={Starships} 
          options={{ title: 'Naves' }}
        />
        <Stack.Screen 
          name="Movies" 
          component={Movies} 
          options={{ title: 'Filmes' }}
        />
        <Stack.Screen 
          name="About" 
          component={About} 
          options={{ title: 'Sobre' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primaryBackground,
    backgroundColor: GlobalStyles.colors.primaryColor,
  },
  headerButtonText: {
    fontSize: 16,
    color: GlobalStyles.colors.primaryBackground,
  },
});