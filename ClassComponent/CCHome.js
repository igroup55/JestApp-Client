import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text,SafeAreaView,StyleSheet } from 'react-native';
import { Button, Header ,Image} from 'react-native-elements';
import HomeActivityList from './HomeActivityList';




export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        
      <View>
        
          <View>
          
        {/* <Header
  leftComponent={{ icon: 'menu', color: '#A7D489' }}
 
  rightComponent={{ icon: 'home', color: '#fff' }}
    /> */}
      </View>
      <View style={{height:400}}>
        
          <HomeActivityList/>
         
       <Text>____________________________________________________________</Text>
        <Text style={{textAlign:'center',fontSize:20,backgroundColor:'#A7D489',padding:20,borderStyle:'solid',borderWidth:2,borderColor:'black',}}>מה הג'סטה הבאה שלך?</Text>

        

      </View>
    <View>
    <Button style={{width:50,justifyContent:'center',alignItems:'center'}}
          title='שליח רכבת'
          onPress={() => { this.props.navigation.navigate('New Train Route');}}

          
          
        />
        <Text></Text>
         <Button
          title='שולח חבילה'
          onPress={() => { this.props.navigation.navigate('NewDelivery'); }}
          
        />
        <Text></Text>
         <Button
          title='שליח אקספרס'
          onPress={() => { this.props.navigation.navigate('New Express Route');}}

          
        />
        
      </View>
      <Image
      source={{ uri: 'https://i.pinimg.com/originals/e0/f4/80/e0f480f3cfdae579699f62a70c57d891.jpg' }}
      style={{  width:400,height:300, justifyContent:'center',alignItems:'center',}}
    />
      </View>

    
    );
  }
}
const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  LastOperations:{
    maxHeight:10,
  }
});