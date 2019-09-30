import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {
  Container,
  Button,
  Input,
  Label,
  Item,
  Content,
  Footer,
  FooterTab,
  DatePicker,
} from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';
import {createOpportunityActvityAction} from '../../../action/opportunity';
import useForm from 'react-hook-form';

function CreateActivity(props) {
  const activity = props.selectedOpportunityCard.selectedOpportunity;
  // activity.parentAccount
  const {register, handleSubmit, setValue, getValues, errors} = useForm({
    defaultValues: {
      parentAccount: '',
      Title: '',
      Type: '',
      //   desciption: '',
      Status: '',
      Date: '',
      DueDate: '',
    },
  });
  var valuesData = getValues();
  setCreatedDate = newDate => {
    let date = moment(newDate).format('YYYY/MM/DD');
    setValue('Date', date);
  };
  setDueDate = newDate => {
    let date = moment(newDate).format('YYYY/MM/DD');

    setValue('DueDate', date);
  };

  const onSubmit = async data => {
    await props.createOpportunityActvityAction(data);
    // props.navigation.navigate('CreateActivity');
  };

  return (
    <Container>
      <Content>
        <View style={{flex: 1}}>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Parent Account</Label>
            <Input
              placeholder={'Big Iron'}
              style={styles.input}
              value={valuesData.parentAccount}
              name="parentAccount"
              ref={register({name: 'parentAccount'}, {required: true})}
              onChangeText={e => {
                setValue('parentAccount', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.parentAccount && 'Parent Account is required'}
          </Text>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Title</Label>
            <Input
              placeholder={'Opportunity 1'}
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

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Activity type</Label>

            <Input
              placeholder={'None'}
              keyboardType={'numeric'}
              style={styles.input}
              value={valuesData.Type}
              name="Type"
              ref={register({name: 'Type'}, {required: true})}
              onChangeText={e => {
                setValue('Type', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Type && 'Activity type is required'}
          </Text>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Current Status</Label>

            <Input
              placeholder={'Current Status'}
              style={styles.input}
              value={valuesData.Status}
              keyboardType={'numeric'}
              name="Status"
              ref={register({name: 'Status'}, {required: true})}
              onChangeText={e => {
                setValue('Status', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Status && 'Current Status is required'}
          </Text>

          <Item DatePicker style={styles.item}>
            <View>
              <Label style={styles.label}>Created</Label>

              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                name="Date"
                ref={register({name: 'Date'}, {required: false})}
                // placeHolderText={valuesData.closeDate}
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: 'black'}}
                onDateChange={setCreatedDate}
                disabled={false}
              />
            </View>
          </Item>

          <Item DatePicker style={styles.item}>
            <View>
              <Label style={styles.label}>Due Date</Label>

              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                // placeHolderText={valuesData.closeDate}
                name="DueDate"
                ref={register({name: 'DueDate'}, {required: false})}
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: 'black'}}
                onDateChange={setDueDate}
                disabled={false}
              />
            </View>
          </Item>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <FooterTab style={{backgroundColor: 'white', elevation: 0}}>
          <Button
            success
            full={true}
            style={styles.footerLeftButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.footerText}>Save</Text>
          </Button>
          <Button
            full={true}
            danger
            style={styles.footerRightButton}
            onPress={() => props.navigation.navigate('Tab')}>
            <Text style={styles.footerText}>Cancel</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

var styles = StyleSheet.create({
  errorText: {color: 'red', marginLeft: 10},
  label: {color: 'grey'},
  input: {color: 'black'},
  item: {marginLeft: 10, marginTop: 20},
  footer: {marginBottom: 10, backgroundColor: 'white', elevation: 0},
  footerLeftButton: {
    marginRight: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  footerRightButton: {
    // backgroundColor: 'yellow',
    marginRight: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  footerText: {color: 'black', fontWeight: 'bold'},
});

const mapStateToProps = state => {
  console.log('state value', state);
  return {
    selectedOpportunityCard: state.opportunityReducer,
  };
};

export default connect(
  mapStateToProps,
  {createOpportunityActvityAction},
)(CreateActivity);
