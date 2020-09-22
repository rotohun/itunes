import React from 'react';
import {SearchBar} from 'react-native-elements';

function SearchBarComponent({value, onChangeText}) {
  return (
    <SearchBar
      placeholder={'search...'}
      value={value}
      onChangeText={onChangeText}
      style={{ width: '100%' }}
    />
  );
}

export default SearchBarComponent;
