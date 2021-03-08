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
      {/* <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}
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
    alignSelf:'center'
  },
  titles: {
    textAlign: 'center',
    fontWeight: 'bold',
marginBottom: 5,
marginTop:5,
    alignItems: 'center'
  }
});

export default CheckBoxes;