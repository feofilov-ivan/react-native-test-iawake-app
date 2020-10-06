import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem} from 'react-native-elements';
import TrackPlayer, {usePlaybackState, useTrackPlayerProgress} from 'react-native-track-player';
import {Icon} from 'react-native-elements';

const PlayList: React.FC = ({route}) => {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = useState<null | string>(null);
  const {itemId} = route.params;
  const program = useSelector((state) => state.media.programs.find((item) => item.id === itemId));

  async function setupPlayer() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    });
  }

  async function togglePlayback(item) {
    if (!currentTrack || currentTrack !== item.key) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: item.key,
        url: item.media.mp3.url,
        title: item.title,
        artist: 'IAwake API',
        duration: item.duration,
      });
      await TrackPlayer.play();
      setCurrentTrack(await TrackPlayer.getCurrentTrack());
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  function ProgressBar() {
    const progress = useTrackPlayerProgress();

    return (
      <View style={styles.progress}>
        <View style={{flex: progress.position, backgroundColor: '#2089dc'}} />
        <View
          style={{
            flex: progress.duration - progress.position,
            backgroundColor: '#c0c0c0',
          }}
        />
      </View>
    );
  }

  function isCurrentTrack(key) {
    return currentTrack === key;
  }

  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <FlatList
      style={{flex: 1}}
      data={program.tracks}
      renderItem={({item}) => (
        <>
          <ListItem bottomDivider onPress={() => togglePlayback(item)}>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <Icon
              type="font-awesome"
              name={isCurrentTrack(item.key) ? 'pause' : 'play'}
              color={isCurrentTrack(item.key) ? '#2089dc' : '#c0c0c0'}
            />
          </ListItem>
          {isCurrentTrack(item.key) && <ProgressBar />}
        </>
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 2,
    width: '100%',
    flexDirection: 'row',
  },
});

export default React.memo(PlayList);
