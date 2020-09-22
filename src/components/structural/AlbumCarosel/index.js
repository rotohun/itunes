import React from 'react';
import {Text} from 'react-native';
import {Animated} from 'react-native';
import AlbumDisplay from '../AlbumDisplay';

const AlbumCarosel = ({scrollX, data}) => {
  if (!data) {
    return <Text>Lodaing...</Text>;
  }
  return (
    <Animated.FlatList
      data={data}
      style={{marginTop: 5}}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
      keyExtractor={(item) => item.id.attributes['im:id']}
      renderItem={({item, index}) => (
        <AlbumDisplay
          index={index}
          scrollX={scrollX}
          key={item.category.attributes['im:id']}
          album={item}
        />
      )}
    />
  );
};

export default AlbumCarosel;
