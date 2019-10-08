import React from 'react';
import {Item, Label, Input, Text, Icon, Spinner} from 'native-base';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import images from '../assets/index';
import {authenticate, togglePasswordVisibility} from '../action/login_action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import useForm from 'react-hook-form';

Login.navigationOptions = {header: null};
function Login(props) {
  const {register, handleSubmit, setValue, errors} = useForm(); // initialise the hook
  const onSubmit = async data => {
    Keyboard.dismiss();
    await props.requestLoginApi(data.email, data.password);
    if (props.userState.user.userName) props.navigation.navigate('AppStack');
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={images.background} style={{flex: 1}}>
        <ImageBackground
          source={images.backgroundTransparent}
          style={{flex: 1}}>
          <View style={styles.viewContainer}>
            <Image source={images.logo} />
            {props.userState.error != '' ? (
              <Text style={{color: 'red'}}>{props.userState.error}</Text>
            ) : (
              <View />
            )}
            <View style={styles.inputView}>
              <View style={{flex: 1}}>
                <Item floatingLabel>
                  <Label style={{color: 'white'}}>UserName</Label>
                  <Input
                    name="email"
                    ref={register({name: 'email'}, {required: true})}
                    placeholder="email"
                    placeholderTextColor="white"
                    onChangeText={e => setValue('email', e)}
                    style={{color: 'white'}}
                    autoCapitalize="none"
                  />
                  {errors.email && <Icon name="add" style={{color: 'red'}} />}
                </Item>
              </View>
            </View>

            <View style={styles.inputView}>
              <View style={{flex: 1}}>
                <Item floatingLabel={true}>
                  <Label style={{color: 'white'}}>Password</Label>
                  <Input
                    name="password"
                    ref={register({name: 'password'}, {required: true})}
                    placeholder="password"
                    placeholderTextColor="white"
                    onChangeText={e => setValue('password', e)}
                    secureTextEntry={props.userState.togglePassword}
                    style={{color: 'white'}}
                  />

                  {props.userState.togglePassword ? (
                    <Icon
                      active={false}
                      name="eye-off"
                      style={{color: 'white'}}
                      onPress={() => props.togglePasswordAction()}
                    />
                  ) : (
                    <Icon
                      active={false}
                      name="eye"
                      style={{color: 'white'}}
                      onPress={() => props.togglePasswordAction()}
                    />
                  )}
                </Item>
                <Text style={{color: 'red'}}>
                  {errors.password && 'password is required'}
                </Text>
              </View>
            </View>
            <View style={styles.loginView}>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.touchableView}>
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
            {props.common.isLoading ? (
              <View>
                <Spinner />
              </View>
            ) : (
              <View />
            )}
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#2f8aed',
    borderRadius: 5,
    borderWidth: 1,
  },
  inputView: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    height: 60,
    justifyContent: 'space-between',
    marginRight: '20%',
    marginLeft: '20%',
    borderBottomColor: 'white',
    // marginBottom: 15
  },

  loginView: {
    flexDirection: 'row',
    height: 50,
    marginRight: '20%',
    marginLeft: '20%',
    marginTop: 15,
    backgroundColor: 'yellow',
    borderRadius: 5,
  },

  touchableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => ({
  userState: state.auth,
  common: state.common,
});

const mapDispatchToProps = dispatch => ({
  requestLoginApi: bindActionCreators(authenticate, dispatch),
  togglePasswordAction: bindActionCreators(togglePasswordVisibility, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
