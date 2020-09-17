/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback} from 'react';
import {StatusBar} from 'react-native';
import {getItunesTopAlbums} from './src/network';

const App: () => React$Node = () => {
  const ItunesAlbums = useCallback(async () => {
    const data = await getItunesTopAlbums();
    console.log(data);
  });
  useEffect(async () => {
    const currentAlbumList = ItunesAlbums();
    return currentAlbumList;
  });
  return (
    <>
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default App;
