import React, { Component, useState } from 'react';
import { CheckBox, Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon, DatePicker } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, Text, View ,Dimensions} from 'react-native';
import CheckBoxes from './CCCheckBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactDOM from "react-dom";
import DatePickerExample from './DatePicker';
import Map from './Map';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
export default class CCExpressRouteSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: null,
      selected2: null,
      selected3: null,
      StationsList : []
    };

  }

async componentDidMount () {
  //  fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Stations',{
  //     method: 'GET',
  //      headers: {
  //           Accept: 'application/json, text/json, charset=UTF-8',
  //           'Content-Type': 'application/json, text/json'
  //     }
  //    })
  //    .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //    .catch(err => console.error(err));
   const apiStationsUrl ='http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Stations';
   const response = await fetch(apiStationsUrl);
   const data = await response.json()
   this.setState({StationsList:data,})
   console.log(data);
};
  onValueChange1 = (value) => {
    this.setState({
      selected1: value
    });
  }
  onValueChange2 = (value) => {
    this.setState({
      selected2: value
    });
  }
  onValueChange3 = (value) => {
    this.setState({
      selected3: value
    });
  }


   addPack = () => {



    const package_data = {

      StartStation: this.state.selected1,
      EndStation: this.state.selected2,
      Pweight: this.state.selected3,


    }

    fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
      method: 'POST',
      body: JSON.stringify(package_data),
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
      })
      .then(res => {
      console.log('res=', res);
      return res.json()
      })
      .then(
      (result) => {
      console.log("fetch POST= ", result);

      },
      (error) => {
      console.log("err post=", error);
      });

//  console.log(package_data)
//     const url = `http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages`;
//     fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: new Headers({
//         'Content-Type': 'application/json; text/json; application/x-www-form-urlencoded  ;  charset=UTF-8'

//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       }),
//       Accept: 'application/json ',

//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: package_data // body data type must match "Content-Type" header
//     }).then(response => response.json())
//     .then(data => {
//       console.log(data)
//     });
   this.props.navigation.navigate('New Express Route');
} 
    

 
  render() {
 
    let stations= this.state.StationsList.map((stations,key)=>{
      return (<Picker.Item key={key} label={stations.StationName} value={stations.StationName} />)});

    return (
      <SafeAreaView>
        <ScrollView>
          <View >
            <Header style={{ backgroundColor: 'green', borderBottomWidth: 2, borderColor: 'black', borderBottomColor: 'black' }}><Text style={{ fontSize: 30, fontWeight: 'bold', backgroundColor: 'green' }}> JestApp</Text></Header>


            <Form style={{ width: 390 }}>
              <View >
                <Icon name="location" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles} >תחנת מוצא</Text>
                <Item picker style={styles.InputText}>
                  <Picker
                    mode="dropdown"
                    style={{  textAlign: 'right' }}
                    placeholder="בחר תחנת מוצא"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange1.bind(this)}
                  >

           <Picker.Item label='בחר תחנת מוצא' value='None' />

                   {stations}

                
                  </Picker>
                </Item>
              </View>

              <View style={styles.section}>
                <Icon name="map" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}>התחנה הקרובה</Text>
                
               
              </View>
           
              <View style={styles.container}>
                <MapView
                style={{flex: 0.7, width:Dimensions.get('window').width }}
                region={{
                latitude: 32.157154,
                longitude: 34.843893,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
                }} >
                <Marker
                coordinate={{
                latitude: 32.15715,
                longitude: 34.843893
                }}
                title='my place:)'
                description='here i am'
                //image={require('../assets/icon.png')}
                />
                </MapView>
                </View>

              
              <Button  style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 70, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}><Text style={{ fontWeight: 'bold' }}>  חפש חבילות </Text></Button>

         
                    


         


            </Form>



          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}



const styles = ({
  container: {
    flex: 1,
    backgroundColor: '#cbe8ba',
    alignItems: 'center',
    justifyContent: 'center',

  },
  InputText: {
    textAlign: 'right',
    borderColor: 'green',
    borderStyle: 'solid',
    backgroundColor: '#cbe8ba',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10
  },
  titles: {
    textAlign: 'center',
    fontWeight: 'bold',
marginBottom: 5,
marginTop:5,
    alignItems: 'center'
  },
  section: {
    marginTop: 15,
    marginBottom: 5
  }

});
