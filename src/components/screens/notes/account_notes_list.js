import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Button,
  Fab,
  Footer,
  FooterTab,
  CardItem,
  Card,
  Left,
  Toast,
  Spinner,
} from 'native-base';
import {connect} from 'react-redux';
import {deleteAccountNotes} from '../../../action/accounts';
import RBSheet from 'react-native-raw-bottom-sheet';
import CreateAccountNotes from './create_account_notes';
import Icon from 'react-native-vector-icons/FontAwesome';

class AccountNotesList extends Component {
  state = {
    notes: [],
    selectedItem: {},
  };

  onClose = () => {
    this.RBSheet.close();
  };
  onCloseNewSheet = () => {
    this.RBSheetNew.close();
  };
  onSubmit = async data => {};
  createNewNotes = () => {
    this.RBSheetNew.open();
  };
  onSubmitNewNotes = () => {};
  handleOnSubmit = async () => {
    Toast.show({
      text: 'create notes',
      buttonText: 'Okay',
      type: 'success',
      position: 'center',
    });
    this.props.navigation.navigate('Tab');
  };
  componentDidMount() {
    console.log(
      'whan i hit submit its once more its comming aa..=>',
      this.props.selectedAccountCard.selectedAccount.Notes,
    );
    var entry = this.props.selectedAccountCard.selectedAccount;
    var name;
    var countIndices = 0;
    for (name in entry) {
      if (name === 'Notes') {
        ++countIndices;
      }
    }
    if (countIndices >= 1) {
      this.setState({
        notes: this.props.selectedAccountCard.selectedAccount.Notes,
      });
      return;
    }
  }
  deleteNotes = async item => {
    await this.props.deleteAccountNotes(item.Id);
  };
  render() {
    return (
      <Container>
        {this.props.common.isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            extraData={this.props.selectedAccountCard.selectedAccount.Notes}
            data={this.props.selectedAccountCard.selectedAccount.Notes}
            keyExtractor={(data, index) => `n ${index}`}
            renderItem={({item}) => {
              return (
                <Card>
                  <CardItem>
                    <Text>{item.Title}</Text>
                  </CardItem>
                  <CardItem>
                    <Text>{item.Comments}</Text>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text>{item.Date}</Text>
                    </Left>

                    <TouchableOpacity
                      onPress={() => {
                        // this.setState({selectedItem: item});

                        // this.RBSheet.open();
                        this.deleteNotes(item);
                      }}>
                      {/* <Icon name="edit" style={{color: 'grey'}} size={30} /> */}
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </CardItem>
                </Card>
              );
            }}
          />
        )}

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          // closeOnPressMask={false}
          height={400}
          duration={150}
          // closeOnDragDown={true}
          customStyles={{
            container: {
              flex: 1,
              height: 400,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <CreateAccountNotes
            submit={this.onSubmit}
            close={this.onClose}
            notesData={this.state.selectedItem}
          />
        </RBSheet>
        <View style={{flex: 1}}>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: 'rgb(255,217,25)'}}
            position="bottomRight"
            onPress={this.createNewNotes}>
            <Text style={{fontSize: 25, color: 'black'}}>+</Text>
          </Fab>
          <RBSheet
            ref={ref => {
              this.RBSheetNew = ref;
            }}
            // closeOnPressMask={false}
            height={400}
            duration={150}
            // closeOnDragDown={true}
            customStyles={{
              container: {
                flex: 1,
                height: 400,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              },
            }}>
            <CreateAccountNotes
              submit={this.onSubmitNewNotes}
              close={this.onCloseNewSheet}
            />
          </RBSheet>
        </View>
        <Footer
          style={{marginBottom: 10, backgroundColor: 'white', elevation: 0}}>
          <FooterTab style={{backgroundColor: 'white', elevation: 0}}>
            <Button
              success
              full={true}
              style={{
                marginRight: 5,
                borderRadius: 5,
                marginLeft: 10,
              }}
              onPress={this.handleOnSubmit}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Save</Text>
            </Button>
            <Button
              full={true}
              danger
              style={{
                // backgroundColor: 'yellow',
                marginRight: 10,
                borderRadius: 5,
                marginLeft: 5,
              }}
              onPress={() => this.props.navigation.navigate('Tab')}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>Cancel</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  label: {color: 'grey'},
  input: {color: 'black'},
  itemStyle: {marginLeft: 10, marginTop: 20},
});

const mapStateToProps = state => {
  console.log('state value', state);
  return {
    selectedAccountCard: state.accountReducer,
    common: state.common,
  };
};

export default connect(
  mapStateToProps,
  {deleteAccountNotes},
)(AccountNotesList);
