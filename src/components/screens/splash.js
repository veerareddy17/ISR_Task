import * as React from 'react';
import {Container, Content} from 'native-base';
import {ImageBackground, Image, Dimensions} from 'react-native';
import images from '../../assets/index';
import StoreService from '../../services/StoreService';

class Splash extends React.Component {
  static navigationOptions = {header: null};
  async componentDidMount() {
    try {
      const access_token = await StoreService.get('access_token');

      this.props.navigation.navigate(access_token ? 'AppStack' : 'AuthStack');
      props.navigation.navigate('AppStack');
    } catch (err) {}
  }

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <Container>
        <ImageBackground
          source={images.background}
          style={{flex: 1}}></ImageBackground>
      </Container>
    );
  }
}

export default Splash;
