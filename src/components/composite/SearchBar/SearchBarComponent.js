import React from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';

function SearchBarComponent({value, onChangeText}) {
  return (
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
      <SearchBar
        placeholder={'search...'}
        value={value}
        onChangeText={onChangeText}
        style={{
          zIndex: 20,
          height: 20,
        }}
        inputContainerStyle={{
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 10,
        }}
        containerStyle={{
          borderBottomColor: '#fff',
          borderTopColor: '#fff',
          width: '80%',
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 10,
          padding: 5,
          backgroundColor: '#fff',
        }}
      />
    </View>
  );
}

export default SearchBarComponent;
