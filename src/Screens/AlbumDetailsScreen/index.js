import React, {useCallback} from 'react';
import {
  SafeAreaView,
  Animated,
  Text,
  Image,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AlbumDetailsScreen = ({route, navigation}) => {
  const {album} = route.params;
  const handlePress = useCallback(async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <TouchableOpacity
          style={{marginTop: 20, marginLeft: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 170, height: 170, marginBottom: 30,}}
          source={{uri: album['im:image'][2].label}}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{marginBottom: 10}}>
            Artist Name: {album['im:artist'].label}
          </Text>
          <Text style={{marginBottom: 10}}>
            Album Name: {album['im:name'].label}
          </Text>
          <Text>
            Album Release Date: {album['im:releaseDate'].attributes.label}
          </Text>
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 160,
              backgroundColor: '#24a0ed',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              const url = album['im:artist'].attributes.href;
              handlePress(url);
            }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {' '}
              Listen Here{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AlbumDetailsScreen;
