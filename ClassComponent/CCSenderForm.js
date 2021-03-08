import React, { Component, useState } from 'react';
import { CheckBox, Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
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
      StationsList : []
    };

  }

async componentDidMount () {
  const apiStationsUrl ='http://localhost:51585/api/Stations';
  const response = await fetch(apiStationsUrl);
  const data = await response.json();
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

 
   addIng = () => {
    
console.log('adding')
    alert('in addIng');
    const package_data = {

      StartStation: this.state.selected1,
      EndStation: this.state.selected2,
      Pweight: this.state.selected3,

    }

 console.log(package_data)
    const url = `http://localhost:51585/api/Packages`;
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(package_data) // body data type must match "Content-Type" header
    }).then(response =>
      console.log(response.json())
    );
  }

  render() {


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
                    style={{ width: undefined, textAlign: 'right' }}
                    placeholder="בחר תחנת מוצא"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange1.bind(this)}
                  >

                    <Picker.Item label=" בחר תחנת מוצא " value="key0" />
                    <Picker.Item label="חיפה - בת גלים" value="key0" />
                    <Picker.Item label="חיפה - מרכז השמונה" value="key1" />
                    <Picker.Item label="תל אביב - סבידור" value="תל אביב - סבידור" />
                    <Picker.Item label="תל אביב - האוניברסיטה" value="key3" />
                    <Picker.Item label=" תל אביב - השלום" value="key4" />
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
                    <Picker.Item label="חיפה - בת גלים" value="key0" />
                    <Picker.Item label="חיפה - מרכז השמונה" value="key1" />
                    <Picker.Item label="תל אביב - סבידור" value="key2" />
                    <Picker.Item label="תל אביב - האוניברסיטה" value="key3" />
                    <Picker.Item label=" תל אביב - השלום" value="key4" />
                  </Picker>
                </Item>
              </View>


              <CheckBoxes  />

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

                    <Picker.Item label=" מ 0 עד 3 קג " value="key0" />
                    <Picker.Item label=" מ 3 עד 6 קג" value="3.6" />
                    <Picker.Item label="מ 6 עד 10 קג" value="key2" />
                  </Picker>
                </Item>
              </View>


             
              <View  style={styles.section}>
              <Icon name="person" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> פרטי לקוח קצה </Text>
                <Item floatingLabel style={styles.InputText}>
                  <Label ></Label>
                  <Input />
                </Item></View>


              <Button onPress={() => { this.addIng() }} style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 70, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}><Text style={{ fontWeight: 'bold' }}>  צור כרטיס משלוח  </Text></Button>
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
