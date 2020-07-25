/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';

const VAULT_KEY: string = 'VAULT_KEY';

export class AppStorage {
  static getVault = async () : Promise<string | null> => {
    return await AsyncStorage.getItem(VAULT_KEY);
  };

  static setVault = async (encryptedVault: string) : Promise<void> => {
    await AsyncStorage.setItem(VAULT_KEY, encryptedVault)
  };
}
