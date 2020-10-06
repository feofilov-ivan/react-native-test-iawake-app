import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {fetchMedia} from '../actions/mediaActions';
import {ListItem} from 'react-native-elements';

const Media: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const media = useSelector((state) => state.media);

  const fetchMediaAction = React.useCallback(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  useEffect(() => {
    fetchMediaAction();
  }, [fetchMediaAction]);

  if (!media.programs.length && media.loading) {
    return (
      <View style={[styles.ActivityIndicatorContainer, styles.horizontal]}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      style={{flex: 1}}
      data={media.programs}
      renderItem={({item}) => (
        <ListItem
          key={item.id}
          bottomDivider
          onPress={() => navigation.navigate('Playlist', {itemId: item.id})}>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  ActivityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default React.memo(Media);
