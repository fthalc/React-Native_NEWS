import React,{useState, useEffect} from 'react';
import { SafeAreaView, Text, FlatList, View, Image, TouchableHighlight, Alert } from 'react-native';
import prettyTime from './PrettyTime';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Value } from 'react-native-reanimated';

const Headlines = ({navigation}) => {
    const category = navigation.state.params.category;
    const [headlines, setHeadlines] = useState({});
    const country = 'tr';
    const API_KEY = 'Your_API_KEY';
    const arrayCategory = ['Technology', 'Sports', 'Science',' Health',' Business',' Entertainment'];
    let url;
    let isIn = false;
    arrayCategory.forEach(element => {
      if(element === navigation.state.params.category){
        isIn = true
        return ;
       }
    });
    
    
    useEffect(() => {
      fetchData();
    }, []);
    async function fetchData(){
      if(isIn){
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
      }else{
        url = `https://newsapi.org/v2/top-headlines?country=${country}&q=${category}&apiKey=${API_KEY}`;
        
      }
        (await fetch(url))
        .json()
        .then(res => setHeadlines(res));
    }
    if(isIn==true){
      Headlines.navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params && navigation.state.params.name} Haberleri`
      });
    }else{
      Headlines.navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params && navigation.state.params.name} İçeren Haberler`
      });
    }
    function removeSource(title){
        if(title == null || title.indexOf('-') < 0) return title;
        
        var parts = title.split('-');
        parts.pop();
        return parts.join('-')
    }
    function renderItem({ item }) {
        return (
        <TouchableHighlight onPress={() => { navigation.navigate('NewsWebView', { url: item.url, title: item.title })}}>
            <View style={{flex: 1, flexDirection: 'row', padding: 10, borderBottom: 1, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <Image style={{ width: 100, height: 100 }} source={{ uri: item.urlToImage }} />
                <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={{ color:'#000',flexWrap: 'wrap', fontWeight:'bold' }}>{removeSource(item.title)}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems:'center' }}>
                        <Icon name="newspaper-variant-multiple-outline" size={15} style={{paddingRight: 5,color:'#000'}}/>
                        <Text style={{color:'#000',fontWeight:'bold'}}>{item.source.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems:'center' }}>
                        <Icon name="clock-outline" size={15} style={{paddingRight: 5,color:'#000'}}/>
                        <Text style={{color:'#000',fontWeight:'bold'}}>{prettyTime(item.publishedAt)}</Text>
                    </View>
                </View>
                </View>
          </View>
        </TouchableHighlight>);
      }
    return (
        <SafeAreaView style={{backgroundColor:'#e2e2e2',margin:5}}>
        <FlatList
          data={headlines.articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    );
    
};



   
  
 
export default Headlines;