
import * as React from 'react';
import { List, Checkbox , Button } from 'react-native-paper';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text, View  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class CCDeliveryFeed1 extends React.Component {
  state = {
    expanded: false,
    StartStation:null,
    EndStation:null,
    PackagesList1: [],
    PackagesList2: [],
    PackagesList3: [],
    PackagesList: [],
    PackageExist : null  ,
    SStationName:'',
    EStationName:'',
    UserDetail:null
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

   async componentDidMount () {
         {this.getData()}

   let values = await AsyncStorage.multiGet(['StartStation','EndStation' ,'SStationName','EStationName'])
  
   this.setState({StartStation:values[0][1],EndStation:values[1][1],SStationName:values[2][1],EStationName:values[3][1]})


}

async getData() {
  try {
    jsonValue = await AsyncStorage.getItem('UserId')

    jsonValue != null ? UserDetail = JSON.parse(jsonValue) : null;
    this.setState({ UserDetail: UserDetail.UserId })
    
  } catch (e) {
    alert('Error get Item')
    // error reading value
  }
}

async Interested (weight) {
  alert(this.state.UserDetail)

  const apiTDUserUrl = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/TDUser?UserId='+ this.state.UserDetail;
  const response = await fetch(apiTDUserUrl);
  const data = await response.json()
console.log(data.DeliveryID)

  // if  (data !== null ){


  // }

  // else{



  // }

//   התעניינות--------------------------
// GET -CHECk if the user is interested in any packages ( the user is limited to 1 till now)
// POST TO TDUSER ( UserId ,Pweight,Status)


// איסוף------------
// כפתור - אני כאן -
//   Get Packages By Weight And StationID - GET TO PAckages By Sending Paramter weight and stationID
//   We Choose One Package From The Response 
//   Render the Locker ID To User To Take the PAckage From the Locker ( נא לגשת ללוקר מספר *** ולאסוף את החבילה)
//   כפתור איסוף
//   Put to Packages ( Change Status to 3 (נאסף) )
//   Put to Lockers ( Change Status To 1 ( תפוס))
//    Put to TDUser ( add PackageID)



  const TDUsers_data = {

    
      UserID:this.state.UserDetail,
      Pweight:weight,
      Status:0


  }


  fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/TDUser', {
    method: 'POST',
    body: JSON.stringify(TDUsers_data),
    headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
    })
  })
    .then(res => {
      return res.json()
    })
    .then(
      (result) => {

      },
      (error) => {
        console.log("err post=", error);
      }).then(



      );




}

   async getpackages (weight) {

      
     //tar2 - url צריך לשנות אחרי שמעדכנים ל tar 1
     const apiUserUrl = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Packages?startStation='+this.state.StartStation+'&endStation='+this.state.EndStation+'&Pweight='+weight;
     const response = await fetch(apiUserUrl);
     const data = await response.json()
     this.setState({PackagesList:data})
     this.state.PackagesList.map((pack, key) => {
        if(weight === 3)
        this.setState({ PackagesList1: [] });

        if(weight === 6)
        this.setState({ PackagesList2: [] });

        if(weight === 10)
        this.setState({ PackagesList3: [] });
     

if(pack["PackageId"] !== 0){



    if (pack["Pweight"] === 3) {
        this.setState({PackagesList1:[...this.state.PackagesList1,pack]})
    }
    if (pack["Pweight"] === 6) {
        this.setState({PackagesList2:[...this.state.PackagesList2,pack]})
    }
    if (pack["Pweight"] === 10) {
        this.setState({PackagesList3:[...this.state.PackagesList3,pack]})
    }
    }

     });
    
  
   
this.setState({expanded:!this.state.expanded})
     
    }

  render() {
   
   
    return (
      <List.Section title={ this.state.SStationName +'    --->   ' + this.state.EStationName} titleStyle={{fontSize:20,textAlign:'center',}}  >
        <List.Accordion
          title=' חבילות עד 3 ק"ג'
          left={props => <List.Icon {...props} icon="folder" />}
          titleStyle={styles.AccordionTitle}
          onPress={() => {this.getpackages(3.0)}}
          style={styles.AccordionList}
          
        >
     
          <List.Item titleStyle={styles.ItemTitle} title= {'חבילות זמינות :' + this.state.PackagesList1.length } />
          <List.Item titleStyle={styles.ItemTitle} title={this.state.StartStation} />
          <Button onPress={()=>{this.Interested(3)}} style={styles.AccordionButton}><Text style={styles.ButtonText}>סמן קטגוריה</Text></Button>      
          </List.Accordion>
   
        <List.Accordion
          title=' חבילות בין 3 ל 6 ק"ג'
          left={props => <List.Icon {...props} icon="folder" />}
          style={styles.AccordionList}
          onPress={() => {this.getpackages(6.0)}}
          titleStyle={styles.AccordionTitle}
          
        >
          <List.Item titleStyle={styles.ItemTitle} title= {'חבילות זמינות :' + this.state.PackagesList2.length } />
          <List.Item titleStyle={styles.ItemTitle} title="מתעניינים :" />
          <Button onPress={()=>{this.Interested(6)}} style={styles.AccordionButton}><Text style={styles.ButtonText}>סמן קטגוריה</Text></Button>      
        </List.Accordion>
        <List.Accordion
          title=' חבילות בין 6 ל 10 ק"ג'
          left={props => <List.Icon {...props} icon="folder" />}
          onPress={() => {this.getpackages(10.0)}}
          titleStyle={styles.AccordionTitle}
          style={styles.AccordionList}
       
        >
          <List.Item titleStyle={styles.ItemTitle} title= {'חבילות זמינות :' + this.state.PackagesList3.length } />
          <List.Item titleStyle={styles.ItemTitle} title="מתעניינים :" />
          <Button onPress={()=>{this.Interested(10)}} style={styles.AccordionButton}><Text style={styles.ButtonText}>סמן קטגוריה</Text></Button>      
        </List.Accordion>
      </List.Section>
    );
  }
}

const styles = ({
  AccordionTitle: {
   textAlign:'center',
   fontWeight:'bold',
   color:'green'

   
  },
  AccordionButton:{
backgroundColor:'#cbe8ba',
textAlign:'center'



    
  },
  ItemTitle:{

  },
  AccordionList:{
marginBottom:8,


  },
  ButtonText:{
color:'black',
fontWeight:'bold',



  }

});


export default CCDeliveryFeed1;