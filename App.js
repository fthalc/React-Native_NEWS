import React,{useState } from 'react';
import { Text,FlatList,View ,TextInput, SafeAreaView, ImageBackground, Dimensions,TouchableHighlight, Alert, Platform, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/Entypo";

const App = ({navigation}) => {
  const [text ,setText] = useState('');
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
        }}>{item.name}
        </Text>
        
      </ImageBackground>
     </TouchableHighlight>
  );
  }
  return (
    <SafeAreaView>
       <View style={{padding: 10}}>
      
      <View style={{ backgroundColor:'#e2e2e2',flexDirection: 'row', alignItems:'center',justifyContent: 'space-between',borderRadius:10,padding:5 }} >
                        
        <TextInput
          style={{color:'#000',height: 40,width:tileWidth}}
          placeholder="Ara.."
          placeholderTextColor="#000"
          onChangeText={newText => setText(newText)}
          defaultValue={text}/>
          <Icon onPress={() => navigation.navigate('Headlines', { category: text,name:text})}
          name="magnifying-glass" size={30} style={{paddingRight: 5,color:'#000'}}/>
      </View>
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