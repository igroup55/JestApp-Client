import React, { Component, useState } from 'react';
import { CheckBox, Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text , View } from 'react-native';
import CheckBoxes from './CCCheckBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactDOM from "react-dom";

export default class CCSenderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: null,
      selected2: null,
      selected3: null,
      StationsList : [],
      CustPNum : ' ',
      CustName :' ',
      EmptyLocker : null
    };

  }

 async componentDidMount () {
//  fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Stations',{
//       method: 'GET',
//         headers: {
//              Accept: 'application/json, text/json, charset=UTF-8',
//              'Content-Type': 'application/json, text/json'
//        }
//       })
//       .then(response => response.json())
//      .then(data => {
//        this.setState({StationsList:data});
//      })
//      .catch(err => console.error(err));

     const apiStationsUrl ='http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Stations';
     const response = await fetch(apiStationsUrl);
     const data = await response.json()
     console.log(data)
     this.setState({StationsList:data})


    
};

  onValueChange1 = (value) => {
    this.setState({
      selected1: value
    });
    console.log(this.state.selected1)
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
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  
  }

  AddCust = () => {
    
    const customer_data = {
CustomerId: '18',
PackageID: '23353',
      FullName : this.state.CustName,
      PhoneNum : this.state.CustPNum
      
 
     }

     fetch('http://proj.ruppin.ac.il/igrop55/test2/tar1/api/Customers', {
      method: 'POST',
      body: JSON.stringify(customer_data),
      headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
      })


  }

   addPack = () => {

// ----------------------------------------------------------------------------------------------------------------
// Search For empty lockers ( לוקרים פנויים )
// ----------------------------------------------------------------------------------------------------------------
    
    const apiStationsUrl ='http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Lockers';
     const response = await fetch(apiStationsUrl);
     const data = await response.json()
     console.log(data)
     this.setState({EmptyLocker:data})

     

     if(this.state.EmptyLocker !== null)
     {
      const package_data = {

        StartStation: this.state.selected1,
        EndStation: this.state.selected2,
        Pweight: this.state.selected3,
        Status : 1
        
  
      }

      fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
        method: 'POST',
        body: JSON.stringify(package_data),
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
        })
        })
  
        {this.AddCust()}

   

    }

    else {

      const package_data = {

        StartStation: this.state.selected1,
        EndStation: this.state.selected2,
        Pweight: this.state.selected3,
        Status : 0
        
  
      }

      fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
        method: 'POST',
        body: JSON.stringify(package_data),
        headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
        })
        })
  
        {this.AddCust()}


    }

    this.props.navigation.navigate('DeliveryFeed'); 
    
  }

  render() {

    let stations = this.state.StationsList.map((stations,key)=>{
      return ( <Picker.Item key={key} label={stations.StationName} value={stations.StationName} />)});
    
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

              <CheckBoxes  />
              <Icon name="person" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> פרטי לקוח קצה </Text>

               
               
                   <Item>
          <Input style={styles.InputText}
            placeholderTextColor="grey"
            placeholder="שם"
            returnKeyType="search"
           
            onChangeText={val => this.setState({ CustName: val })}
          />
        </Item>
   <Text>{this.state.CustName}</Text>
        <Item>
          <Input style={styles.InputText}
            placeholderTextColor="grey"
            placeholder="טלפון"
            returnKeyType="search"
       
            onChangeText={val => this.setState({ CustPNum: val })}
          />
        </Item>
              <View  style={styles.section}>
                <Icon name="line-weight" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> משקל חבילה </Text>
                <Item picker style={styles.InputText}>
                  <Picker
                    mode="dropdown"
                    style={{ width: undefined, textAlign: 'right', borderColor: 'black', borderWidth: 2 }}
                    placeholder="בחר משקל חבילה"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected3}
                    onValueChange={this.onValueChange3.bind(this)}
                  >
                    <Picker.Item label=" בחר משקל חבילה" value="10" />
                    <Picker.Item label=" מ 0 עד 3 קג " value="3" />
                    <Picker.Item label=" מ 3 עד 6 קג" value="6" />
                    <Picker.Item label="מ 6 עד 10 קג" value="10" />
                  </Picker>
                </Item>
              </View>

              {/* <View  style={styles.section}>
              <Icon name="person" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> פרטי לקוח קצה </Text>
                <Item floatingLabel style={styles.InputText}>
                  <Label ></Label>
                  <Input />
                </Item></View> */}

              <Button onPress={() => { this.addPack() }} style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 70, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}><Text style={{ fontWeight: 'bold' }}>  צור כרטיס משלוח  </Text></Button>
            
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
    marginTop:10

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
