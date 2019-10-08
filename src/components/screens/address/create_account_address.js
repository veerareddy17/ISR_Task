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
} from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';
import {createAccountAddresses} from '../../../action/accounts';
import useForm from 'react-hook-form';
import uuid from 'react-native-uuid';
import {Buffer} from 'buffer';
global.Buffer = Buffer;

function CreateAccountAddress(props) {
  //   const activity = props.selectedOpportunityCard.selectedOpportunity;
  // activity.parentAccount
  const {register, handleSubmit, setValue, getValues, errors} = useForm({
    defaultValues: {
      Title: '',
      Address1: '',
      Address2: '',
      Address3: '',
      Zip: '',
      City: '',
      State: '',
      IsDefault: '',
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
    data.IsDefault = true;
    var Id = uuid.v1({
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      msecs: new Date().getTime(),
      nsecs: 5678,
    });
    data.Id = Id;

    await props.createAccountAddresses(data);

    props.navigation.navigate('EditAccount');
  };

  return (
    <Container>
      <Content>
        <View style={{flex: 1}}>
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
            <Label style={styles.label}>Address1</Label>
            <Input
              placeholder={'Address1'}
              style={styles.input}
              value={valuesData.Address1}
              name="Address1"
              ref={register({name: 'Address1'}, {required: true})}
              onChangeText={e => {
                setValue('Address1', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Address1 && 'Address1 is required'}
          </Text>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Address2</Label>
            <Input
              placeholder={'Address2'}
              style={styles.input}
              value={valuesData.Address2}
              name="Address2"
              ref={register({name: 'Address2'}, {required: false})}
              onChangeText={e => {
                setValue('Address2', e);
              }}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Address3</Label>
            <Input
              placeholder={'Address3'}
              style={styles.input}
              value={valuesData.Address3}
              name="Address3"
              ref={register({name: 'Address3'}, {required: false})}
              onChangeText={e => {
                setValue('Address3', e);
              }}
            />
          </Item>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>City</Label>
            <Input
              placeholder={'City'}
              style={styles.input}
              value={valuesData.City}
              name="City"
              ref={register({name: 'City'}, {required: true})}
              onChangeText={e => {
                setValue('City', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.City && 'City is required'}
          </Text>
          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>State</Label>
            <Input
              placeholder={'State'}
              style={styles.input}
              value={valuesData.State}
              name="State"
              ref={register({name: 'State'}, {required: true})}
              onChangeText={e => {
                setValue('State', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.State && 'State is required'}
          </Text>

          <Item floatingLabel style={styles.item}>
            <Label style={styles.label}>Current Zip</Label>

            <Input
              placeholder={'Current Zip'}
              style={styles.input}
              value={valuesData.Zip}
              keyboardType={'numeric'}
              name="Zip"
              ref={register({name: 'Zip'}, {required: true})}
              onChangeText={e => {
                setValue('Zip', e);
              }}
            />
          </Item>
          <Text style={styles.errorText}>
            {errors.Zip && 'Current Zip is required'}
          </Text>
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
    selectedAccountCard: state.accountReducer,
  };
};

export default connect(
  mapStateToProps,
  {createAccountAddresses},
)(CreateAccountAddress);
