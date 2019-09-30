import {AsyncStorage} from 'react-native';

export default class StoreService {
  static async store(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value), () => {});
    } catch (error) {}
  }

  static async get(key) {
    var response = await AsyncStorage.getItem(key);
    return response;
  }

  static async remove(key) {
    await AsyncStorage.removeItem(key);
  }
}
