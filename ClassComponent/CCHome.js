import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text,SafeAreaView,StyleSheet } from 'react-native';
import { Header ,Image} from 'react-native-elements';
import HomeActivityList from './HomeActivityList';
import {CarouselCards} from './CarouselCards';
import { Button } from 'native-base';


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
          
       
      </View>
      <View style={{height:315}}>
        
          <HomeActivityList />
         
      
        <Text style={{textAlign:'center',fontSize:20,backgroundColor:'#A7D489',padding:20,borderStyle:'solid',borderWidth:2,borderColor:'black',}}>מה הג'סטה הבאה שלך?</Text>

        



      </View>
      
      {/* <SafeAreaView style={styles.container}>
      <CarouselCards />
    </SafeAreaView> */}
    <View style={{backgroundColor:'#fff',paddingBottom:5}}>
    <Button  onPress={() => { this.props.navigation.navigate('NewTrainRoute');}}
       style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 10,padding:20, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}>
          <Text style={{ fontWeight: 'bold' }}>
            שליח רכבת 
         </Text>
         </Button>
    {/* <Button style={{width:50,justifyContent:'center',alignItems:'center'}}
          title='שליח רכבת'
          onPress={() => { this.props.navigation.navigate('TrainSelection');}}

          
          
        /> */}
        <Text></Text>
        <Button  onPress={() => { this.props.navigation.navigate('NewDelivery'); }}
       style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 10,padding:20, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}>
          <Text style={{ fontWeight: 'bold' }}>
           שולח חבילה 
         </Text>
         </Button>
         {/* <Button
          title='שולח חבילה'
          onPress={() => { this.props.navigation.navigate('NewDelivery'); }}
          
        /> */}
        <Text></Text>
        <Button  onPress={() => { this.props.navigation.navigate('NewExpressRoute');}}
       style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 10,padding:20, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}>
          <Text style={{ fontWeight: 'bold' }}>
           שליח אקספרס
         </Text>
         </Button>
         {/* <Button
          title='שליח אקספרס'
          onPress={() => { this.props.navigation.navigate('NewExpressRoute');}}

          
        /> */}
        
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
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    textAlign:'center',
  },
  LastOperations:{
    maxHeight:10,
  }
});