/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  Animated,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import SearchBarComponent from './src/components/composite/SearchBar/SearchBarComponent';
import {getItunesTopAlbums} from './src/network';

const {width, height} = Dimensions.get('window');

const DisplayAlbum = ({album, index, scrollX}) => {
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
        console.log('hello');
      }}
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        width,
        height,
      }}>
      <Animated.Image
        source={{uri: bgImage}}
        style={{
          width: width * 0.8,
          height: width * 0.8,
          marginBottom: 20,
          resizeMode: 'contain',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 8,
          transform: [{scale}],
        }}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Text
          style={{
            marginBottom: 20,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            opacity,
            transform: [{translateX: albumTitle}],
          }}>
          {album['im:name'].label}
        </Animated.Text>
        <Animated.Text
          style={{
            marginBottom: 20,
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

const App: () => React$Node = () => {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const ItunesAlbums = useCallback(async () => {
    const data = await getItunesTopAlbums();
    if (data) {
      setAlbums(data);
      return;
    }
    return;
  }, []);
  useEffect(() => {
    ItunesAlbums();
  }, [ItunesAlbums]);
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 8,
          }}>
          <SearchBarComponent value={search} onChangeText={setSearch} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Animated.FlatList
            data={albums}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => item.id.attributes['im:id']}
            renderItem={({item, index}) => (
              <DisplayAlbum
                index={index}
                scrollX={scrollX}
                key={item.category.attributes['im:id']}
                album={item}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
