/**
 * @format
 */
import { NativeModules } from 'react-native';

const Aes = NativeModules.Aes;

export class Encryptor {
  encrypt = async (password: string, data: object): Promise<string> => {
    console.log(await Aes.randomKey(16));
    return '';
  }
}
