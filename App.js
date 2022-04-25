import React,{useState } from 'react';
import { Text, FlatList,View ,TextInput, SafeAreaView, ImageBackground, Dimensions,TouchableHighlight, Alert, Platform, StatusBar} from 'react-native';
 
const App = ({navigation}) => {
  const [text, setText] = useState('');
  const numColumns = 3;
  const tileWidth = Dimensions.get('window').width / numColumns;
  const imageBaseUrl = "https://images.unsplash.com/photo-";
  const imageParameters = "?auto=format&fit=crop&w=375&q=80";
  const dataSource = [
    { category: 'Technology',name:'Teknoloji', imageId: '1478358161113-b0e11994a36b' },
    { category: 'Sports',name:'Spor', imageId: '1521412644187-c49fa049e84d' },
    { category: 'Science',name:'Bilim', imageId: '1532968961962-8a0cb3a2d4f5' },
    { category: 'Health', name:'Sağlık',imageId: '1526256262350-7da7584cf5eb' },
    { category: 'Business',name:'İş', imageId: '1542222024-c39e2281f121' },
    { category: 'Entertainment',name:'Eğlence', imageId: '1503676260728-1c00da094a0b' },
    { category: 'General',name:'Genel', imageId: '1494059980473-813e73ee784b' },
  ];

  const renderItem = ({ item }) => {
    return (
     <TouchableHighlight onPress={() => navigation.navigate('Headlines', { category: item.category,name:item.name })}>
        <ImageBackground
        source={{ uri: imageBaseUrl + item.imageId + imageParameters }}
        blurRadius={7}
        resizeMode='cover'
        style={{
          margin:1,
          width: tileWidth,
          height: tileWidth,
          justifyContent: 'center',
        }}>
        <Text style={{ 
          fontWeight:'bold',
          textAlign: 'center',
          color: '#fff',
          fontSize: 25
        }}>{item.name}</Text>
      </ImageBackground>
     </TouchableHighlight>
  );
  }
  return (
    <SafeAreaView>
       <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Ara.."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      
      
    </View>
      <FlatList
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
      />
    </SafeAreaView>
    
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