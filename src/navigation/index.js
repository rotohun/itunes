import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AlbumListScreen from '../Screens/AlbumListScreen';
import AlbumDetailsScreen from '../Screens/AlbumDetailsScreen';

const Stack = createStackNavigator();
function NavigationStack() {
  const navigationRef = React.createRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Albums">
        <Stack.Screen
          options={{headerShown: false}}
          name="Albums"
          component={AlbumListScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AlbumsDetails"
          component={AlbumDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
