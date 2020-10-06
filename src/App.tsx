import Home from './screens/Home';
import Settings from './screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from 'react-native-easy-icon';
import {SafeAreaView, StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Icon name={iconName} type="material-community" size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
};

export default App;
