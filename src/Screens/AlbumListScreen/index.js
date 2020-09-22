import React, {useEffect, useCallback, useState, useRef} from 'react';
import {SafeAreaView, Animated} from 'react-native';
import SearchBarComponent from '../../components/composite/SearchBar/SearchBarComponent';
import {getItunesTopAlbums} from '../../network';
import Title from '../../components/structural/Title';
import AlbumCarosel from '../../components/structural/AlbumCarosel';

const AlbumListScreen = ({navigation}) => {
  const {navigate} = navigation;
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const ItunesAlbums = useCallback(async () => {
    const data = await getItunesTopAlbums();
    if (data) {
      setAlbums(data);
      setFilteredAlbums(data);
      return;
    }
    return;
  }, []);
  useEffect(() => {
    ItunesAlbums();
  }, [ItunesAlbums]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const searchFilter = (text) => {
    const newAlbumsData = albums;
    setSearch(text);
    if (text.length === 0) {
      setFilteredAlbums(albums);
      return;
    }
    const newData = newAlbumsData.filter((album) => {
      const albumsData = album['im:name'].label.toUpperCase();
      const textData = text.toUpperCase();
      return albumsData.indexOf(textData) > -1;
    });
    setFilteredAlbums(newData);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Title />
      <SearchBarComponent value={search} onChangeText={searchFilter} />
      <AlbumCarosel
        data={filteredAlbums}
        scrollX={scrollX}
        navigate={navigate}
      />
    </SafeAreaView>
  );
};

export default AlbumListScreen;
