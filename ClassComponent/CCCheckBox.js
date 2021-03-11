import React, { useState } from "react";
import {  CheckBox , Text, StyleSheet, View } from "react-native";
import {Container, Header, Content, Form, Item, Input, Label, Picker, Footer, Right, Button, Icon } from 'native-base';


const CheckBoxes = () => {
  
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.section}>
     <Icon style={{alignSelf:'center'}}name="home"/>
        <Text style={styles.titles}>משלוח עד הבית ?</Text>
        <View style={{alignSelf:'center'}}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
      
        />
    
      </View>
      
      <Text>
        {isSelected ? ( <View  style={styles.section }>
              <Icon name="person" style={{ alignSelf: 'center', marginTop: 10 }} />
                <Text style={styles.titles}> פרטי לקוח קצה </Text>



                <View  >

                <Item floatingLabel style={styles.InputText}>    
                <Label>שם מלא</Label>      
                  <Input style={{width:100, alignContent:'center'}}/>
                </Item>

                <Item floatingLabel style={styles.InputText}>
                <Label>כתובת</Label>
                  <Input style={{width:100, alignContent:'center'}}/>
                </Item>
                
                <Item floatingLabel style={styles.InputText}>
                <Label>טלפון</Label>
                  <Input style={{width:100, alignContent:'center'}}/>
                </Item>
        

                </View>

                </View>) : null}</Text>
    </View>
  );
};

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",
   },
   checkboxContainer: {
     flexDirection: "row",
     marginBottom: 20,
   },
   checkbox: {
     alignSelf: "center",
   },
   label: {
     margin: 8,
   },
   section: {
     marginTop: 15,
     marginBottom: 5,
  
     
   },
   titles: {
     textAlign: 'center',
     fontWeight: 'bold',
 marginBottom: 5,
 marginTop:5,
     alignItems: 'center'
   },
   InputText: {
    textAlign: 'right',
    borderColor: 'green',
    borderStyle: 'solid',
    backgroundColor: '#cbe8ba',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignSelf:'center',
    width:365
  },
 });

export default CheckBoxes;