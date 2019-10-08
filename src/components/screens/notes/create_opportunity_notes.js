import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Button,
  Input,
  Label,
  Item,
  Content,
  DatePicker,
  Card,
  Footer,
  FooterTab,
} from 'native-base';
import moment from 'moment';
import Images from '../../../assets/index';
import useForm from 'react-hook-form';
import {connect} from 'react-redux';
import {createOpportunityNotes} from '../../../action/opportunity';

function CreateOpportunityNotes(props) {
  const notes = props.notesData
    ? props.notesData
    : {
        Title: '',
        Date: moment()
          .locale('fr')
          .format('YYYY/MM/DD'),
        Comments: '',
      };
  const {register, handleSubmit, setValue, getValues, errors} = useForm({
    defaultValues: {
      Title: notes.Title,
      Date: notes.Date,
      Comments: notes.Comments,
    },
  });

  var valuesData = getValues();
  onBlur = () => {
    console.log('#####: onBlur');
  };

  _onPressClose = () => {
    props.close();
  };

  const onSubmit = async data => {
    await props.createOpportunityNotes(data);

    // this.props.navigation.navigate('Tab');
    props.close();
  };

  setDate = newDate => {
    const date = moment(newDate).format('YYYY/MM/DD');
    // this.setState({date: date});
    setValue('Date', date);
  };

  renderItem = () => {
    return (
      <View style={{flex: 1}}>
        <Content style={{flex: 1}}>
          <Card>
            <View style={{flex: 1}}>
              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>Title</Label>

                <Input
                  placeholder={'tile'}
                  style={styles.input}
                  value={valuesData.Title}
                  name="Title"
                  ref={register({name: 'Title'}, {required: true})}
                  onChangeText={e => {
                    setValue('Title', e);
                  }}
                />
              </Item>
              <Text style={styles.errorText}>
                {errors.Title && 'Title is required'}
              </Text>
              <Item DatePicker style={styles.itemStyle}>
                <View>
                  <Label style={styles.label}>Date</Label>
                  <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2020, 12, 31)}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    // placeHolderText={this.state.date}
                    name="Date"
                    ref={register({name: 'Date'}, {required: true})}
                    textStyle={{color: 'green'}}
                    placeHolderTextStyle={{color: 'black'}}
                    onDateChange={setDate}
                    disabled={false}
                  />
                </View>
              </Item>
              <Text style={styles.errorText}>
                {errors.Date && 'Date is required'}
              </Text>

              <Item floatingLabel style={styles.itemStyle}>
                <Label style={styles.label}>Comments</Label>

                <Input
                  style={styles.input}
                  multiline={true}
                  placeholder={'comment'}
                  value={valuesData.Comments}
                  name="Comments"
                  ref={register({name: 'Comments'}, {required: false})}
                  onChangeText={e => {
                    setValue('Comments', e);
                  }}
                />
              </Item>
            </View>
          </Card>
        </Content>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={_onPressClose}>
          <View style={styles.closeStyle}>
            {/* <Text style={{marginRight: 10}}>close</Text> */}
            <Image source={Images.close} style={{marginRight: 10}} />
          </View>
        </TouchableOpacity>

        <View style={styles.headerView}>
          <Text style={styles.headerStyle}>Notes</Text>
        </View>
      </View>

      {renderItem()}

      <Footer style={{marginBottom: 5, backgroundColor: 'white', elevation: 0}}>
        <FooterTab style={{backgroundColor: 'white', elevation: 0}}>
          <Button
            success
            full={true}
            style={{
              marginRight: 5,
              borderRadius: 5,
              marginLeft: 5,
            }}
            onPress={handleSubmit(onSubmit)}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Save</Text>
          </Button>
          <Button
            full={true}
            danger
            style={{
              // backgroundColor: 'yellow',
              marginRight: 5,
              borderRadius: 5,
              marginLeft: 5,
            }}
            onPress={_onPressClose}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Cancel</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>
  );
}

var styles = StyleSheet.create({
  errorText: {color: 'red', marginLeft: 10},
  labelInput: {
    color: '#555555',
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1.5,
    borderColor: '#333',

    paddingBottom: 5,
  },
  headerStyle: {
    fontSize: 22,
    alignSelf: 'center',
    marginRight: 60,
    fontWeight: 'bold',
    color: '#555555',
  },
  headerView: {flex: 1, justifyContent: 'center', height: 60},
  input: {
    borderWidth: 0,
    marginTop: 10,
    paddingBottom: 2,
  },

  label: {color: 'grey'},
  input: {color: 'black'},
  itemStyle: {marginLeft: 10, marginTop: 20},
  footer: {
    height: 50,
    backgroundColor: 'yellow',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  closeStyle: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 60,
    height: 60,
    borderBottomRightRadius: 60,
    backgroundColor: 'red',
  },
});

export default connect(
  '',
  {createOpportunityNotes},
)(CreateOpportunityNotes);
