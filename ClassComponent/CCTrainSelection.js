import React, { Component, useState } from 'react';
import { CheckBox, Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon} from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CheckBoxes from './CCCheckBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker'
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default class CCTrainSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StartStation: null,
      EndStation: null,
      date:new Date(),
       StationsList : [],
       PackagesList:[],
       isLoading:0,
     
    };
    
  }
  setDate(newDate){
    this.setState({ chosenDate: newDate });
  }
async componentDidMount () {
 ////tar2 - url צריך לשנות אחרי שמעדכנים ל tar 1
 this.setState({isLoading:1});
   const apiStationsUrl ='http://proj.ruppin.ac.il/igroup55/test2/tar2/api/Stations';
   const response = await fetch(apiStationsUrl);
   const data = await response.json()
   this.setState({StationsList:data,})
  // console.log(data);
   this.setState({isLoading:0});
};


  onValueChange1 = (value) => {
    this.setState({
      StartStation: value
    });


  }
  onValueChange2 = (value) => {
    this.setState({
      EndStation: value
    });
   

  }
  
  storeData = async (key,value) => {
       
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(key+": "+jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  
 

   navigate = () => {

    this.state.StationsList.map((station,key)=>{
if (station.StationID === this.state.StartStation) {

  this.storeData('SStationName',station.StationName)

 
}
if (station.StationID === this.state.EndStation) {
  
  this.storeData('EStationName',station.StationName)
  
}

    })

this.storeData('StartStation',this.state.StartStation)
this.storeData('EndStation',this.state.EndStation)
    this.props.navigation.navigate('DeliveryFeed');


} 

  render() {
    const { date } = this.state;
    let stations= this.state.StationsList.map((stations,key)=>{


      return (<Picker.Item key={key} label={stations.StationName} value={stations.StationID} />)});

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
                    selectedValue={this.state.StartStation}
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
                    selectedValue={this.state.EndStation}
                    onValueChange={this.onValueChange2.bind(this)}
                  >
                    <Picker.Item label="בחר תחנת יעד" value="key0" />
                    {stations}
                  </Picker>
                </Item>
              </View>



              <Text style={{ alignSelf: 'center', marginTop: 10,fontWeight:'bold' }}>בחר תאריך נסיעה</Text>
              {/* <Icon name="calendar"  style={{ alignSelf: 'center', marginTop: 10 }} /> */}
              
              {/* <DatePicker
        style={{ alignSelf: 'center', marginTop: 10 }}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate={new Date()}
        maxDate="2021-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date}) }}
      /> */}

              <Button onPress = {this.navigate} style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 70, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}><Text style={{ fontWeight: 'bold' }}>  חפש משלוחים </Text></Button>

            </Form>
            
          <View> 
            {this.state.isLoading === 1?( <ActivityIndicator size="large" color="#A7D489" />):null}       
         
   
          </View>


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
