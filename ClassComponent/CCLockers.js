import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class CCLockers extends Component {

    constructor(props) {
        super(props);
        this.state = {

UserName: null ,
LockerID: null , 
PackageID: null,
StationName: ''
        }
    }
    
    async componentDidMount() {

        this.getMultiple()
        this.getData()
    }

    async getData() {
        try {
          jsonValue = await AsyncStorage.getItem('UserId')
    
          jsonValue != null ? UserDetails = JSON.parse(jsonValue) : null;
          this.setState({ UserName: UserDetails.FullName })
 
        } catch (e) {
          alert('Error get Item')
          // error reading value
        }
      }


  
      async getMultiple () {

    
    try {
       
     let values = await AsyncStorage.multiGet(['PackageID','LockerID' , 'StationName'])
    this.setState({LockerID: values[1][1] , PackageID:values[0][1] , StationName:values[2][1]})  
    
    } catch(e) {
      // read error
    }
    
 
  
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }

    render() {
        return (
            <View style={styles.container}>
                <Text> {this.state.UserName} שלום  </Text>
                <Text> נוצר בהצלחה משלוח מס' {this.state.PackageID}</Text>
                <Text> שריינו עבורך את הלוקר מס' {this.state.LockerID} </Text>
                <Text> תחנה : {this.state.StationName}</Text>

                
            </View>
        )
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
  
