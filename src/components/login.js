import React, {Component} from 'react';
import {Container, Item, Label, Input, Text, Toast, Icon} from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

import images from '../assets/index';
import {authenticate, loginValidation} from '../action/login_action';
import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import validate from './validate_fields';

class Login extends Component {
  static navigationOptions = {header: null};

  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    showPassword: true,
  };

  register = async () => {
    const emailError = validate(
      'email',
      this.state.email,
      this.state.email.length,
    );
    const passwordError = validate(
      'password',
      this.state.password,
      this.state.password.length,
    );
    if (emailError || passwordError) {
      this.props.loginValidationApi(emailError, passwordError);
      Toast.show({
        text: `Eneter the correct ${this.props.userState.emailError} ${this.props.userState.passwordError}`,
        buttonText: 'Okay',
        type: 'danger',
        position: 'center',
      });
    } else {
      await this.props.requestLoginApi(this.state.email, this.state.password);
    }
    if (this.props.userState.user.token)
      this.props.navigation.navigate('AppStack');
  };

  render() {
    console.log(this.props.userState);
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={images.background} style={{flex: 1}}>
          <ImageBackground
            source={images.backgroundTransparent}
            style={{flex: 1}}>
            <View style={styles.viewContainer}>
              <Image source={images.logo} />
              <View style={styles.inputView}>
                <View style={{flex: 1}}>
                  <Item floatingLabel>
                    <Label style={{color: 'white'}}>Username</Label>
                    <Input
                      onChangeText={text => {
                        this.setState({email: text});
                      }}
                      style={{color: 'white'}}
                    />
                  </Item>
                </View>
              </View>

              <View style={styles.inputView}>
                <View style={{flex: 1}}>
                  <Item floatingLabel={true}>
                    <Label style={{color: 'white'}}>Password</Label>
                    <Input
                      onChangeText={text => {
                        this.setState({password: text});
                      }}
                      secureTextEntry={this.state.showPassword}
                      style={{color: 'white'}}
                    />
                    {/* <Image source={images.eye} /> */}
                    {this.state.showPassword ? (
                      <Icon
                        active={false}
                        name="eye-off"
                        style={{color: 'white'}}
                        onPress={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
                      />
                    ) : (
                      <Icon
                        active={false}
                        name="eye"
                        style={{color: 'white'}}
                        onPress={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
                      />
                    )}
                  </Item>
                </View>
              </View>
              <View style={styles.loginView}>
                <TouchableOpacity
                  onPress={this.register}
                  style={styles.touchableView}>
                  <Text>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
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
  loginValidationApi: bindActionCreators(loginValidation, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
