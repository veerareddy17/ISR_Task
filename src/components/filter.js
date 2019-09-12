import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Left,
  Right,
  Card,
  CardItem,
  Fab,
  ListItem,
  CheckBox,
  Body,
  InputGroup,
  Input,
  Icon,
} from 'native-base';
import Images from '../assets/index';
import Header from './header';

class Filter extends Component {
  constructor(props) {
    super(props);
    //this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.state = {
      isLoading: true,
      checkboxes: [],
    };
  }

  toggleCheckbox(id) {
    let checkboxes = this.state.checkboxes;

    if (checkboxes && checkboxes.includes(id)) {
      const index = checkboxes.indexOf(id);
      checkboxes.splice(index, 1);
    } else {
      checkboxes = checkboxes.concat(id);
    }

    this.setState({checkboxes});
    console.log('MS check a4: ' + checkboxes && checkboxes.includes(id));
  }

  render() {
    console.log('filter props is... lets check.=>', this.props);
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 50,
            elevation: 8,
            backgroundColor: 'white',
          }}>
          <Header>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
              }}>
              <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 15}}>
                Filter
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.closeDrawer();
                }}>
                <Image source={Images.close} style={{marginRight: 10}} />
              </TouchableOpacity>
            </View>
          </Header>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: 30,
              backgroundColor: 'grey',
              alignItems: 'center',
              marginTop: 1,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>County</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 40,
                flex: 1,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <InputGroup>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
              </InputGroup>
            </View>
          </View>
          <View style={{height: 250}}>
            <FlatList
              data={[
                {id: 'a1', name: 'county1'},
                {id: 'a2', name: 'county2'},
                {id: 'a3', name: 'county3'},
                {id: 'a4', name: 'county4'},
              ]}
              renderItem={({item}) => {
                const itemName = item.name;
                return (
                  <ListItem>
                    <CheckBox
                      onPress={() => this.toggleCheckbox(item.id)}
                      checked={
                        this.state.checkboxes &&
                        this.state.checkboxes.includes(item.id)
                      }
                    />

                    <Text style={{marginLeft: 10}}>{item.name}</Text>
                  </ListItem>
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: 30,
              backgroundColor: 'grey',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Category</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 40,
                flex: 1,
                margin: 10,
                borderRadius: 10,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <InputGroup>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
              </InputGroup>
            </View>
          </View>
          <View style={{height: 300}}>
            <FlatList
              data={[
                {id: 'a1', name: 'category1'},
                {id: 'a2', name: 'category2'},
                {id: 'a3', name: 'category3'},
                {id: 'a4', name: 'category4'},
              ]}
              renderItem={({item}) => {
                return (
                  <ListItem>
                    <Text>{item.name}</Text>
                  </ListItem>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Filter;
