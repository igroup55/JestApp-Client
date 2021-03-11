import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
export default class HomeActivityList extends Component {
  render() {
    return (
      <Container style={styles.LastOperations}>
        <Header />
        <Content>
          <List style={{maxHeight:250,}}>
            {}
            <TouchableOpacity>
            <ListItem avatar style={{borderBottomColor:'black'}}>
              <Right>
                <Thumbnail source={{ uri: 'data:image/jpeg;base64,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' }} />
              </Right>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>deliver a package from tel aviv to haifa</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
                <Text note>_______</Text>
                <Text style={{backgroundColor:'green'}} note>status</Text>
              </Right>
            </ListItem>
            </TouchableOpacity>
            <ListItem avatar>
              <Right>
                <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLbZW7uQWpcA_IfQtWcM69g7oBzUiNdQk9lQ&usqp=CAU' }} />
              </Right>
              <Body>
                <Text>George takala</Text>
                <Text note>Express delivery from netanya-sapir has 5 packages left</Text>
              </Body>
              <Right>
                <Text note>4:23 pm</Text>
              
                <Text style={{backgroundColor:'darkred'}} note>status</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBFeV8MBWK9Q9TAgRn0mNoVvu5dvBL-WLbOg&usqp=CAU' }} />
              </Left>
              <Body>
                <Text>katie perry</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>5:35 pm</Text>
                <Text note>_______</Text>
                <Text style={{backgroundColor:'orange'}} note>status</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    safeview: {
      flex: 1,
    },
    LastOperations:{
      maxHeight:300,
    }
  });
  const operation ={
   
  };