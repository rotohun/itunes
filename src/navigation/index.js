import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumListScreen from '../Screens/AlbumListScreen';

const Stack = createStackNavigator();

function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={AlbumListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
