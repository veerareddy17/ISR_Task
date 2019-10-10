import listingApi from './listing.api';
import StoreService from './StoreService';
import {APIConstants} from './api_constant';

export default class AuthService {
  static bidderNumber = '';

  static async login(body) {
    const params = new URLSearchParams();
    params.append('username', body.username);
    params.append('password', body.password);
    params.append('grant_type', body.grant_type);
    console.log('control is');
    var response = await listingApi
      .post(APIConstants.AUTHENTICATION_URL, params)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
    console.log('response is....', response);

    if (response.data.access_token) {
      // AuthService.bidderNumber = response.data.data.bidderNumber;
      // await StoreService.store('user', response.data.data);
      await StoreService.store('access_token', response.data.access_token);
      await StoreService.store('userName', response.data.userName);
    }
    return response.data;
  }

  static async logout() {
    AuthService.bidderNumber = null;
    await StoreService.remove('access_token');
    // await StoreService.remove('user');
  }

  static async isAuthenticated(key) {
    var user = await StoreService.get('user');
    if (!user) return false;

    return true;
  }

  static async getToken() {
    return (await AuthService.getUser()).token;
  }

  static async getUser() {
    let user = await StoreService.get('user');
    user = JSON.parse(user);
    if (user) AuthService.bidderNumber = user.bidderNumber;
    return user;
  }
}
