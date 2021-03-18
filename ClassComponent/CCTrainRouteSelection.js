import React, { Component, useState } from 'react';
import { CheckBox, Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon, DatePicker } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CheckBoxes from './CCCheckBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactDOM from "react-dom";
import DatePickerExample from './DatePicker';

export default class CCTrainRouteSelection extends Component {
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


   navigate = () => {

    this.props.navigation.navigate('DeliveryFeed')

//     const package_data = {

//       StartStation: this.state.selected1,
//       EndStation: this.state.selected2,
//       Pweight: this.state.selected3,


//     }

//     fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
//       method: 'POST',
//       body: JSON.stringify(package_data),
//       headers: new Headers({
//       'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
//       })
//       })
//       .then(res => {
//       console.log('res=', res);
//       return res.json()
//       })
//       .then(
//       (result) => {
//       console.log("fetch POST= ", result);

//       },
//       (error) => {
//       console.log("err post=", error);
//       });

// //  console.log(package_data)
// //     const url = `http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages`;
// //     fetch(url, {
// //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
// //       mode: 'cors', // no-cors, *cors, same-origin
// //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
// //       credentials: 'same-origin', // include, *same-origin, omit
// //       headers: new Headers({
// //         'Content-Type': 'application/json; text/json; application/x-www-form-urlencoded  ;  charset=UTF-8'

// //         // 'Content-Type': 'application/x-www-form-urlencoded',
// //       }),
// //       Accept: 'application/json ',

// //       redirect: 'follow', // manual, *follow, error
// //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// //       body: package_data // body data type must match "Content-Type" header
// //     }).then(response => response.json())
// //     .then(data => {
// //       console.log(data)
// //     });
  
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
                <Icon name="flag" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}>תחנת יעד</Text>
                <Item picker style={styles.InputText}>

                  <Picker
                    mode="dropdown"
                    placeholder="בחר תחנת יעד"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                  >
                    <Picker.Item label="בחר תחנת יעד" value="key0" />
                    {stations}
                  </Picker>
                </Item>
              </View>


              <Icon name="calendar"  style={{ alignSelf: 'center', marginTop: 10 }} />
              {/* <DatePickerExample/> */}
              <Button onPress = {this.navigate} style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 70, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}><Text style={{ fontWeight: 'bold' }}>  חפש משלוחים </Text></Button>

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
