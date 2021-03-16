import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Text,
         View,
         TextInput,
         TouchableOpacity,
         ScrollView,
         StyleSheet,
         ActivityIndicator
         
   
           
        } from 'react-native';
import {Icon} from 'native-base';        
import { Button, Header ,Image} from 'react-native-elements';



export default class RegisterForm extends Component {
    state={
        fullName: '',
        password: '',
        email: '',
        phone_number: '',
        ID:'',
        ProfilePic:'',
        fullName_Error: '',
        password_Error: '',
        email_Error: '',
        phone_number_Error: '',
        ID_Error:'',
        ProfilePic_Error:''
    }
    componentDidMount (){
      this.AddUser;
  }
  AddUser = () => {

    alert('in AddUser');
    const User = {
    Fullname: this.state.fullName,
    EmailAddress: this.state.email,
    password: this.state.password,
    PhoneNum:this.state.phone_number,
    UserId: this.state.ID,
    ProfilePic: this.state.ProfilePic,
    }
    console.log(User.fullName);
    console.log(User.email);
    console.log(User.phone_number);
    fetch('http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Users', {
      method: 'POST',
      body: JSON.stringify(User),
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
    ////
    // const url = `http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Users`;
    // fetch(url, {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin', // include, *same-origin, omit
    //   headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(User) // body data type must match "Content-Type" header
    // }).then(response =>
    //   console.log(response.json())
    // );
  }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
      }
      validateName(){
        let rjx=/^[a-zA-Z]+$/;
        let isNameValid= rjx.test(this.state.fullName);
        console.warn(isNameValid);
        if(!isNameValid){
          this.setState({fullName_Error:"Name should be letters from a-z or A-Z"});
        }
        else{
          this.setState({fullName_Error:""})
        }
      }
      validateEmail(){
        let rjx=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
        let isEmailValid= rjx.test(this.state.email);
        console.warn(isEmailValid);
        if(!isEmailValid){
          this.setState({email_Error:"Format should be text@domain.com"});
        }
        else{
          this.setState({email_Error:""})
        }
      }
      validatePassword(){
        let rjx=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/;
        let isPasswordValid= rjx.test(this.state.password);
        console.warn(isPasswordValid);
        if(!isPasswordValid){
          this.setState({password_Error:"Password must be contain Minimum eight characters, at least one uppercase letter and at least one number"});
        }
        else{
          this.setState({password_Error:""})
        }
      }
      validatePhone(){
        let rjx=/[0-9]{10}/;
        let isPhoneValid= rjx.test(this.state.phone_number);
        console.warn(isPhoneValid);
        if(!isPhoneValid){
          this.setState({phone_number_Error:"phone number is 10 digits"});
        }
        else{
          this.setState({phone_number_Error:""})
        }
      }
      validateID(){
        let rjx=/[0-9]{9}/;
        let isIDValid= rjx.test(this.state.ID);
        console.warn(isIDValid);
        if(!isIDValid){
          this.setState({ID_Error:"phone number is 9 digits"});
        }
        else{
          this.setState({ID_Error:""})
        }
      }
      validate =()=>{
        let fullName_Error= "";
        let password_Error= "";
        let email_Error = "";
        let phone_number_Error= "";
        let ID_Error="";
        let ProfilePic_Error="";
        this.validateName();
        this.validateEmail();
        this.validatePassword();
        this.validatePhone();
        this.validateID();
        if(ID_Error){
          this.setState({ID_Error});
          return false;
        }
        if(phone_number_Error){
          this.setState({phone_number_Error});
          return false;
        }
        if(email_Error){
          this.setState({email_Error});
          return false;
        }
        if(fullName_Error){
          this.setState({fullName_Error});
          return false;
        }
        if(ProfilePic_Error){
          this.setState({ProfilePic_Error});
          return false;
        }
        if(password_Error){
          this.setState({password_Error});
          return false;
        }
        return true;
      }
      signUp = async () => {
        const user={ Fullname:this.state.fullName,Password:this.state.password,EmailAddress:this.state.email,PhoneNum:this.state.phone_number ,UserId:this.state.ID , ProfilePic:this.state.ProfilePic} 
        try {
          // here place your signup logic
          const isValid= this.validate();
          if(isValid===true){
              this.AddUser();
              alert(JSON.stringify(user));
              this.props.navigation.navigate('Login');

          // console.log('user successfully signed up!: ', success)
          }
        
        } catch (err) {
          console.log('error signing up:', err)
        }
      { this.props.navigation.navigate('Register'); }
      }
      btnOpenGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        //allowsEditing: true,
        //aspect: [4, 3],
        });
        if (!result.cancelled) {
        this.setState({ ProfilePic: result.uri });
        }
        };
        
    render() {
        return (<ScrollView>
         <View>
           <SafeAreaView>
         </SafeAreaView>
        <View>
    <Text style={{textAlign:'center',fontSize:30}}>ברוך הבא ל JESTAPP</Text>
    <Image
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl97_NDIiRpKTDKaKSDtnGPZbLMRl-A8EWIw&usqp=CAU' }}
      style={{ width: 100, height: 100, justifyContent: 'center',alignItems:'center',marginLeft:140 }}
    />
    </View>
            <View>
                <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='שם מלא'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('fullName', val)}
        />
        <View><Text style={styles.FormErrorText}>{this.state.fullName_Error}</Text></View>
        <TextInput
          style={styles.input}
          placeholder='אימייל'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <View><Text style={styles.FormErrorText}>{this.state.email_Error}</Text></View>
        <TextInput
          style={styles.input}
          placeholder='סיסמא'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <View><Text style={styles.FormErrorText}>{this.state.password_Error}</Text></View>
        <TextInput
          style={styles.input}
          placeholder='מספר טלפון'
          keyboardType="numeric"
          maxLength={10}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <View><Text style={styles.FormErrorText}>{this.state.phone_number_Error}</Text></View>
         <TextInput
          style={styles.input}
          placeholder='ת.ז/ ח.פ'
          maxLength={9}
          keyboardType="numeric"
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => {this.onChangeText('ID', val); this.setState({ID_Error:''})}}
        /><View><Text style={styles.FormErrorText}>{this.state.ID_Error}</Text></View>
         <Button onPress={this.btnOpenGalery.bind(this)} style={{backgroundColor: '#A7D489',padding:20}} title='תמונת פרופיל'/>
         <View style={{padding:10}}></View>
         
         {/* <Button onPress={this.btnOpenGalery.bind(this)} style={styles.gallery}>
               <Icon name='image'/><Text>תמונת פרופיל</Text>
            </Button>        */}
         
        {/* בחירת תאריך לידה */}
        {/* <ChooseDate/> */}
        <Button
          title='הרשם'
          onPress={this.signUp}
          
        />
      </View>
            </View>
            
         </View>
           </ScrollView>
           
        )
    }
    
}
const styles = StyleSheet.create({
    input: {
      textAlign:'center',
      width: 300,
      height: 55,
      backgroundColor: '#A7D489',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    FormErrorText:{
      fontSize: 12,
      color:'red'
    },
    gallery:{
      width:80,
      textAlign:'center', 
      height:68,
      marginRight:50,
      alignItems:'flex-end',
      justifyContent:'flex-start',
      backgroundColor:'#A7D489',
  },
  
    container: {
      marginTop:50,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
