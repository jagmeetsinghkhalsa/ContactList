import React  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/**Imported Screens here */
import ContactList from './scenes/contact_list';
import ContactDetail from './scenes/contact_detail';

const Stack = createStackNavigator();

const headerOption = {
  headerTitleStyle: {
    textAlign:"center", 
    flex:1 
  },
  headerTitleAlign: 'center'
};

export default function App() {

  return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={headerOption}>
          <Stack.Screen
            name="ContactList"
            options={{ headerShown: false }}
            component={ContactList}
            options={{headerShown: true }}
          />
          <Stack.Screen
            name="ContactDetail"
            options={{ headerShown: false }}
            component={ContactDetail}
            options={{headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
