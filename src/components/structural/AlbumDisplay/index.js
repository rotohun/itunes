import React from 'react';
import {Animated, TouchableOpacity, View, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const AlbumDisplay = ({album, index, scrollX, onPress}) => {
  const bgImage = album['im:image'][2].label;
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const albumTitle = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.3, 0, -width * 0.3],
  });
  const albumArtistName = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onPress()
      }}
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingTop: 20,
        width,
        height: 450,
      }}>
      <Animated.Image
        source={{uri: bgImage}}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          marginBottom: 20,
          overflow: 'visible',
          resizeMode: 'contain',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          transform: [{scale}],
        }}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Text
          style={{
            marginBottom: 20,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            opacity,
            transform: [{translateX: albumTitle}],
          }}>
          {album['im:name'].label}
        </Animated.Text>
        <Animated.Text
          style={{
            fontSize: 18,
            opacity,
            transform: [{translateX: albumArtistName}],
          }}>
          {album['im:artist'].label}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumDisplay;
