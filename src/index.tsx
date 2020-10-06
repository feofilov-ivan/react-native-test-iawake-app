import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import App from './App';
import {navigationRef} from './lib/NavigationService';
import {persistor, store} from './store';

export default class Root extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <App />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
