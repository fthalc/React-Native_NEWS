import React from 'react';
import { Text, FlatList, SafeAreaView, ImageBackground, Dimensions,TouchableHighlight, Alert, Platform, StatusBar} from 'react-native';
 
const App = ({navigation}) => {
  const numColumns = 3;
  const tileWidth = Dimensions.get('window').width / numColumns;
  const imageBaseUrl = "https://images.unsplash.com/photo-";
  const imageParameters = "?auto=format&fit=crop&w=375&q=80";
  const dataSource = [
    { category: 'Technology', imageId: '1478358161113-b0e11994a36b' },
    { category: 'Spor', imageId: '1521412644187-c49fa049e84d' },
    { category: 'Health', imageId: '1526256262350-7da7584cf5eb' },
    { category: 'Economy', imageId: '1542222024-c39e2281f121' },
    { category: 'Education', imageId: '1503676260728-1c00da094a0b' },
    { category: 'Music', imageId: '1511671782779-c97d3d27a1d4' },
    { category: 'Theatre', imageId: '1507924538820-ede94a04019d' },
    { category: 'Cinema', imageId: '1478720568477-152d9b164e26' },
    { category: 'Weather', imageId: '1530908295418-a12e326966ba' },
    { category: 'Trip', imageId: '1473625247510-8ceb1760943f' },
    { category: 'Astrology', imageId: '1532968961962-8a0cb3a2d4f5' },
    { category: 'Car', imageId: '1537041373298-55dbb337e651' },
    { category: 'Gallery', imageId: '1500051638674-ff996a0ec29e' },
    { category: 'Video', imageId: '1524253482453-3fed8d2fe12b' },
  ];

  const renderItem = ({ item }) => {
    return (
     <TouchableHighlight onPress={() => navigation.navigate('Headlines', { category: item.category })}>
        <ImageBackground
        source={{ uri: imageBaseUrl + item.imageId + imageParameters }}
        style={{
          width: tileWidth,
          height: tileWidth,
          justifyContent: 'center',
        }}>
        <Text style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 15
        }}>{item.category}</Text>
      </ImageBackground>
     </TouchableHighlight>
  );
  }
  return (
    <FlatList
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.category}
        numColumns={numColumns}
      />
  );
};
App.navigationOptions = ({ navigation }) => ({
  title: 'Haber Kategorileri',
  headerStyle: {
    backgroundColor: '#2196F3',
  },
  headerTintColor: '#FFF',
  headerTitleStyle: {
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Roboto',
  },
});
 
StatusBar.setBarStyle('light-content', true);
export default App;