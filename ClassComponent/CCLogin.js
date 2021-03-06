import React, { Component } from 'react'
import { Image, Linking, Text, TouchableOpacity, TextInput, StyleSheet, View, navigate, navigation } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon } from 'native-base';
export default class CCLogin extends Component {
    state = {
        email: '',
        password: '',
        Users: [],
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
      


    loginuser  ()  {

      

        console.log(this.state.Users);
        this.state.Users.map((user) => {
            console.log(user);
        
            if (this.state.email == user.EmailAddress && this.state.password == user.Password) {
                {this.storeData('UserId',user)}
                this.props.navigation.navigate('Home');
               
            }
            else {
                alert('Wrong email or passowrd');
            }
        });


    }



    async login(email, password) {



        const apiUserUrl = 'http://proj.ruppin.ac.il/igroup55/test2/tar1/api/Users?email=' + email + '&pass=' + password;
        const response = await fetch(apiUserUrl);
        const data = await response.json()
        this.setState({ Users: data, });
        console.log(email,password)
        {this.loginuser()}
    }

    goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    render() {
        return (
            <View style={styles.container}>

                <Image source={{ uri: 'data:image/png;base64,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' }}
                    style={{
                        width: 80,
                        height: 80,
                        alignSelf: 'center',
                        marginBottom: 20
                    }}
                />
                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 30 }}> JestApp  </Text>
                <Text style={{ fontSize: 22, textAlign: 'center' }}>Sign In </Text>
                <Text style={{ color: 'grey', textAlign: 'center', margin: 10 }}>Hey there! nice to see you again</Text>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="green"
                    autoCapitalize="none"
                    onChangeText={val => this.setState({ email: val })}
                />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="green"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={val => this.setState({ password: val })}

                />



                <Button onPress={() => { this.login(this.state.email, this.state.password) }} style={styles.submitButton}><Text style={styles.submitButtonText}> Sign In </Text></Button>

                <View style={{ flexDirection: 'row-reverse' }}>
                    <Text style={{ color: 'blue' }}
                        onPress={() => { this.props.navigation.navigate('Register'); }} >
                        Sign Up ? {'\u00A0'}
                    </Text>

                    <Text style={{ color: 'blue' }}
                        onPress={() => Linking.openURL('http://google.com')}>
                        Forgot Password ?
          </Text>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        margin: 25


    },
    input: {
        margin: 30,
        height: 40,
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0

    },
    submitButton: {
        backgroundColor: 'green',
     
        height: 55,
        width: 150,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 30,
       
        
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,

    }
})
