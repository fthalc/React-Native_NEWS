import React,{useState, useEffect} from 'react';
import { SafeAreaView, Text, FlatList, View, Image, TouchableHighlight, Alert } from 'react-native';
import prettyTime from './PrettyTime';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Headlines = ({navigation}) => {
    const query = navigation.state.params && navigation.state.params.category;
    const [headlines, setHeadlines] = useState({});
    const country = 'tr';
    const API_KEY = '411ebf2636714e03a2bd211b253b2155';
    const url = `https://newsapi.org/v2/top-headlines?
    country=${country}&q=${query}&apiKey=${API_KEY}`;

    useEffect(() => {
      fetchData();
    }, []);
    async function fetchData(){
        (await fetch(url))
        .json()
        .then(res => setHeadlines(res));
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
            <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderBottom: 1, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <Image style={{ width: 100, height: 100 }} source={{ uri: item.urlToImage }} />
                <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text style={{ flexWrap: 'wrap' }}>{removeSource(item.title)}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems:'center' }}>
                        <Icon name="newspaper-variant-multiple-outline" size={15} style={{paddingRight: 5}}/>
                        <Text>{item.source.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems:'center' }}>
                        <Icon name="clock-outline" size={15} style={{paddingRight: 5}}/>
                        <Text>{prettyTime(item.publishedAt)}</Text>
                    </View>
                </View>
                </View>
          </View>
        </TouchableHighlight>);
      }
    return (
        <SafeAreaView>
        <FlatList
          data={headlines.articles}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    );
};
Headlines.navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params && navigation.state.params.category} Haberleri`
  });
   
  
 
export default Headlines;