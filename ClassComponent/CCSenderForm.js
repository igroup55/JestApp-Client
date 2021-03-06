import React, { Component, useState } from 'react';
import { CheckBox, Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon } from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text, View } from 'react-native';
import CheckBoxes from './CCCheckBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactDOM from "react-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class CCSenderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: null,
      selected2: null,
      selected3: null,
      StationsList: [],
      CustPNum: ' ',
      CustName: ' ',
      SStationName: '',
      EStationName: '',
      PackageID: null,
      SEmptyLocker: null,
      EEmptyLocker: null,
      UserId: null,
      Address: ''

    };

  }

  async componentDidMount() {

    { this.getData() }
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

    const apiStationsUrl = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Stations';
    const response = await fetch(apiStationsUrl);
    const data = await response.json()

    this.setState({ StationsList: data })



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
  onChangeText = (key, value) => {
    this.setState({ [key]: value })

  }

  async AddCust() {


    const customer_data = {

      Address: this.state.Address,
      PackageID: this.state.PackageID,
      FullName: this.state.CustName,
      PhoneNum: this.state.CustPNum,


    }


    fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Customers', {
      method: 'POST',
      body: JSON.stringify(customer_data),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })


  }

  UpdateLocker() {

    const Slocker_update = {

      LockerID: this.state.SEmptyLocker[0]["LockerID"],
      PackageID: null,
      Busy: 1

    }



    fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Lockers', {
      method: 'PUT',
      body: JSON.stringify(Slocker_update),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })

    const Elocker_update = {

      LockerID: this.state.EEmptyLocker[0]["LockerID"],
      PackageID: null,
      Busy: 1

    }



    fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Lockers', {
      method: 'PUT',
      body: JSON.stringify(Elocker_update),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })


  }

  async getData() {
    try {
      jsonValue = await AsyncStorage.getItem('UserId')

      jsonValue != null ? UserDetails = JSON.parse(jsonValue) : null;
      this.setState({ UserId: UserDetails.UserId })

    } catch (e) {
      alert('Error get Item')
      // error reading value
    }
  }

  storeData = async (key, value) => {

    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(key + ": " + jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  GetStationName() {

    this.state.StationsList.map((stations, key) => {

      if (stations.StationID === this.state.selected1) {
        this.storeData('StationName', stations.StationName)
      }
    })

  }

  async addPack() {

    // ----------------------------------------------------------------------------------------------------------------
    // Search For empty lockers ( ???????????? ???????????? )
    // ----------------------------------------------------------------------------------------------------------------
    let StartStation = this.state.selected1;
    const apiLockersUrl1 = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Lockers?StationID=' + StartStation;
    const response1 = await fetch(apiLockersUrl1);
    const Start = await response1.json()
    this.setState({ SEmptyLocker: Start })




    let EndStation = this.state.selected2;
    const apiLockersUrl = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Lockers?StationID=' + EndStation;
    const response = await fetch(apiLockersUrl);
    const End = await response.json()

    this.setState({ EEmptyLocker: End })






    if (this.state.EEmptyLocker !== null && this.state.SEmptyLocker !== null) {

      const package_data = {

        StartStation: this.state.selected1,
        EndStation: this.state.selected2,
        Pweight: this.state.selected3,
        UserId: this.state.UserId,
        Status: 1


      }


      fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
        method: 'POST',
        body: JSON.stringify(package_data),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
        })
      })
        .then(res => {


          return res.json()
        })
        .then(
          (result) => {

            this.setState({ PackageID: result })

            this.AddCust()
            this.UpdateLocker()
            this.storeData('PackageID', result)
            this.GetStationName()
            this.storeData('SLockerID', this.state.SEmptyLocker[0]["LockerID"])
            this.storeData('ELockerID', this.state.EEmptyLocker[0]["LockerID"])
            this.props.navigation.navigate('CCLockers');
          },
          (error) => {
            console.log("err post=", error);
          }).then(



          );





      //  fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
      //     method: 'POST',
      //     body: JSON.stringify(package_data),
      //     headers: new Headers({
      //       'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      //     })
      //   }) 


      // const apiLockersUrl = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages?UserID='+ this.state.UserId;
      // const response = await fetch(apiLockersUrl);
      // const ID = await response.json()
      // this.setState({ PackageID: ID[0]["PackageId"]})





    }

    else {

      const package_data = {

        StartStation: this.state.selected1,
        EndStation: this.state.selected2,
        Pweight: this.state.selected3,
        UserId: this.state.UserId,
        Status: 0


      }

      fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages', {
        method: 'POST',
        body: JSON.stringify(package_data),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
        })
      })
        .then(res => {

          return res.json()
        })
        .then(
          (result) => {

            this.setState({ PackageID: result })

            this.AddCust()
            this.props.navigation.navigate('CCLockers');

          },
          (error) => {
            console.log("err post=", error);
          }).then(
           );}}

  render() {

    let stations = this.state.StationsList.map((stations, key) => {
      return (<Picker.Item key={key} label={stations.StationName} value={stations.StationID} />)
    });

    return (
      <SafeAreaView>
        <ScrollView>
          <View >
            <Header style={{ backgroundColor: 'green', borderBottomWidth: 2, borderColor: 'black', borderBottomColor: 'black' }}><Text style={{ fontSize: 30, fontWeight: 'bold', backgroundColor: 'green' }}> JestApp</Text></Header>

            <Form style={{ width: 390 }}>
              <View >

                <Icon name="location" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles} >???????? ????????</Text>
                <Item picker style={styles.InputText}>
                  <Picker
                    mode="dropdown"
                    style={{ textAlign: 'right' }}
                    placeholder="?????? ???????? ????????"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange1.bind(this)}
                  >
                    <Picker.Item label='?????? ???????? ????????' value='None' />
                    {stations}
                  </Picker>
                </Item>
              </View>

              <View style={styles.section}>
                <Text> {this.state.SStationName}</Text>
                <Icon name="flag" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}>???????? ??????</Text>
                <Item picker style={styles.InputText}>

                  <Picker
                    mode="dropdown"
                    placeholder="?????? ???????? ??????"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                  >
                    <Picker.Item label="?????? ???????? ??????" value="key0" />
                    {stations}
                  </Picker>
                </Item>
              </View>

              <CheckBoxes />
              <Icon name="person" style={{ alignSelf: 'center', marginTop: 10 }} />
              <Text style={styles.titles}> ???????? ???????? ?????? </Text>



              <Item>
                <Input style={styles.InputText}
                  placeholderTextColor="grey"
                  placeholder="????"
                  returnKeyType="search"

                  onChangeText={val => this.setState({ CustName: val })}
                />
              </Item>
              <Text>{this.state.CustName}</Text>
              <Item>
                <Input style={styles.InputText}
                  placeholderTextColor="grey"
                  placeholder="??????????"
                  returnKeyType="search"

                  onChangeText={val => this.setState({ CustPNum: val })}
                />
              </Item>
              <View style={styles.section}>
                <Icon name="line-weight" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> ???????? ?????????? </Text>
                <Item picker style={styles.InputText}>
                  <Picker
                    mode="dropdown"
                    style={{ width: undefined, textAlign: 'right', borderColor: 'black', borderWidth: 2 }}
                    placeholder="?????? ???????? ??????????"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selected3}
                    onValueChange={this.onValueChange3.bind(this)}
                  >
                    <Picker.Item label=" ?????? ???????? ??????????" value="10" />
                    <Picker.Item label=" ?? 0 ???? 3 ???? " value="3" />
                    <Picker.Item label=" ?? 3 ???? 6 ????" value="6" />
                    <Picker.Item label="?? 6 ???? 10 ????" value="10" />
                  </Picker>
                </Item>
              </View>

              {/* <View  style={styles.section}>
              <Icon name="person" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> ???????? ???????? ?????? </Text>
                <Item floatingLabel style={styles.InputText}>
                  <Label ></Label>
                  <Input />
                </Item></View> */}

              <Button onPress={() => { this.addPack() }} style={{ alignSelf: 'center', backgroundColor: 'green', marginTop: 70, borderRadius: 10, borderWidth: 1, borderColor: 'black' }}><Text style={{ fontWeight: 'bold' }}>  ?????? ?????????? ??????????  </Text></Button>

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
    marginTop: 10

  },
  titles: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center'
  },
  section: {
    marginTop: 15,
    marginBottom: 5
  }

});
