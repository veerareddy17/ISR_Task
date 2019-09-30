import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
  Toast,
} from 'native-base';
import moment from 'moment';
import {createAccounts, fetchAccounts} from '../../action/accounts';
import {connect} from 'react-redux';
import useForm from 'react-hook-form';

function CreateAccount(props) {
  const {register, handleSubmit, setValue, errors} = useForm(); // initialise the hook

  const onSubmit = async data => {
    console.log(data);
    await props.createAccounts(data);
    await props.fetchAccounts();
    props.navigation.navigate('Tab');
  };
  setDate = date => {
    setValue('RegistrationDate', moment(date).format('YYYY/MM/DD'));
  };

  return (
    <Container>
      <Content>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>First Name</Label>
          <Input
            placeholder={'Big Iron'}
            style={styles.input}
            name="FirstName"
            key="FirstName"
            ref={register({name: 'FirstName'}, {required: true})}
            placeholder="FirstName"
            onChangeText={e => setValue('FirstName', e)}
          />
        </Item>
        <Text style={styles.errorText}>
          {errors.FirstName && 'First Name is required'}
        </Text>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Last Name</Label>
          <Input
            placeholder={'Opportunity 1'}
            style={styles.input}
            name="LastName"
            key="LastName"
            ref={register({name: 'LastName'}, {required: true})}
            placeholder="LastName"
            onChangeText={e => setValue('LastName', e)}
          />
        </Item>
        <Text style={styles.errorText}>
          {errors.LastName && 'Last Name is required'}
        </Text>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Company Name</Label>

          <Input
            placeholder={'Desciption'}
            style={styles.input}
            name="CompanyName"
            key="CompanyName"
            ref={register({name: 'CompanyName'}, {required: true})}
            placeholder="CompanyName"
            onChangeText={e => setValue('CompanyName', e)}
          />
        </Item>
        <Text style={styles.errorText}>
          {errors.CompanyName && 'Company Name is required'}
        </Text>

        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Email</Label>

          <Input
            placeholder={'None'}
            style={styles.input}
            keyboardType={'email-address'}
            name="Email"
            key="Email"
            ref={register({name: 'Email'}, {required: true})}
            placeholder="Email"
            onChangeText={e => setValue('Email', e)}
          />
        </Item>
        <Text style={styles.errorText}>
          {errors.Email && 'Email is required'}
        </Text>

        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Phone</Label>

          <Input
            placeholder={'Desciption'}
            style={styles.input}
            keyboardType={'phone-pad'}
            name="Phone"
            key="Phone"
            ref={register({name: 'Phone'}, {required: true})}
            placeholder="Phone"
            onChangeText={e => setValue('Phone', e)}
          />
        </Item>
        <Text style={styles.errorText}>
          {errors.Phone && 'Phone is required'}
        </Text>

        <Item DatePicker style={styles.item}>
          <View>
            <Label style={styles.label}>Ragistration Date</Label>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              key="RegistrationDate"
              locale={'en'}
              formatChosenDate={date => {
                return moment(date).format('YYYY/MM/DD');
              }}
              name="RegistrationDate"
              ref={register({name: 'RegistrationDate'}, {required: true})}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              textStyle={{color: 'green'}}
              placeHolderTextStyle={{color: 'black'}}
              onDateChange={this.setDate}
              disabled={false}
            />
          </View>
        </Item>
        <Text style={styles.errorText}>
          {errors.RegistrationDate && 'Ragistration Date is required'}
        </Text>
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
            onPress={() => {
              Toast.show({
                text: 'canceld!',
                buttonText: 'Okay',
                type: 'warning',
              });
              props.navigation.navigate('Tab');
            }}>
            <Text style={styles.footerText}>Cancel</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

var styles = StyleSheet.create({
  errorText: {marginLeft: 10, color: 'red'},
  titleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rightView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
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
  return {
    account: state.accountReducer,
  };
};

export default connect(
  mapStateToProps,
  {createAccounts, fetchAccounts},
)(CreateAccount);
