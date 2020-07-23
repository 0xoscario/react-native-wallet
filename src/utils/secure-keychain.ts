/**
 * @format
 */
import * as Keychain from 'react-native-keychain';

const service = 'com.zhima-kaimen';

export class SecureKeychain {
  private static isAuthenticating: boolean = false;

  static getAuthenticating = () => {
    return SecureKeychain.isAuthenticating;
  };

  static getSupportedBiometryType = async () => {
    return Keychain.getSupportedBiometryType();
  };

  static resetGenericPassword = async () => {
		const options = { service };
		return Keychain.resetGenericPassword(options);
  };
  
  static getGenericPassword = async () => {
    SecureKeychain.isAuthenticating = true;
    const options = { service };
    const keychainObject = await Keychain.getGenericPassword(options);
    if (keychainObject && keychainObject.password) {
      SecureKeychain.isAuthenticating = false;
      return keychainObject;
    }
    SecureKeychain.isAuthenticating = false;
    return null;
  };

  static setGenericPassword = async (
    username: string,
    password: string,
    authOptions?: Keychain.Options
  ) => {
		return Keychain.setGenericPassword(username, password, { service, ...authOptions });
	};
}
