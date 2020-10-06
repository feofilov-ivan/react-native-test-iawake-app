import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Media from '../components/Media';
import PlayList from '../components/PlayList';

const Home: React.FC = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Media" component={Media} options={{title: 'Media'}} />
      <HomeStack.Screen name="Playlist" component={PlayList} options={{title: 'Playlist'}} />
    </HomeStack.Navigator>
  );
};

export default React.memo(Home);
