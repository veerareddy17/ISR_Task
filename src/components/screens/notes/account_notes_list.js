import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  Container,
  Fab,
  CardItem,
  Card,
  Left,
  Spinner,
  Body,
  Right,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {deleteAccountNotes} from '../../../action/accounts';
import RBSheet from 'react-native-raw-bottom-sheet';
import CreateAccountNotes from './create_account_notes';

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
                    <Left>
                      <Text>{item.Title}</Text>
                    </Left>
                    <Body>
                      <Text>{item.Comments}</Text>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        onPress={() => {
                          // this.setState({selectedItem: item});

                          // this.RBSheet.open();
                          this.deleteNotes(item);
                        }}>
                        {/* <Icon name="edit" style={{color: 'grey'}} size={30} /> */}
                        <Icon name="trash" style={{color: 'black'}} />
                      </TouchableOpacity>
                    </Right>
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
