/**
 * @format
 */
import { ethers } from 'ethers';
import { NativeModules } from 'react-native';

const Aes = NativeModules.Aes;

export class Encryptor {
  private static generateSalt = (): string => {
    return ethers.utils.base64.encode(ethers.utils.randomBytes(32));
  };

  private static generateKey = async (password: string, salt: string): Promise<string> => {
    return await Aes.pbkdf2(password, salt, 2048, 256);
  };

  private static encryptWithKey = async (text: string, key: string): Promise<any> => {
    const iv = await Aes.randomKey(16);
    const cipher = await Aes.encrypt(text, key, iv);
    return { cipher, iv };
  };

  private static decryptWithKey = async (encryptedData: any, key: string): Promise<string> => {
    return await Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
  };

  static encrypt = async (password: string, data: any): Promise<string> => {
    const salt = Encryptor.generateSalt();
    const key = await Encryptor.generateKey(password, salt);
		const result = await Encryptor.encryptWithKey(JSON.stringify(data), key);
		result.salt = salt;
		return JSON.stringify(result);
  };

  static decrypt = async (password: string, encryptedText: string): Promise<any> => {
    const encryptedData = JSON.parse(encryptedText);
		const key = await Encryptor.generateKey(password, encryptedData.salt);
    const text = await Encryptor.decryptWithKey(encryptedData, key);
    return JSON.parse(text);
  };
}
