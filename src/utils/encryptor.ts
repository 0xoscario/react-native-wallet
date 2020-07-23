/**
 * @format
 */
import { ethers } from 'ethers';
import { NativeModules } from 'react-native';

const Aes = NativeModules.Aes;

export class Encryptor {
  private generateSalt = (): string => {
    return ethers.utils.base64.encode(ethers.utils.randomBytes(32));
  };

  private generateKey = async (password: string, salt: string): Promise<string> => {
    return await Aes.pbkdf2(password, salt, 2048, 256);
  };

  private encryptWithKey = async (text: string, key: string): Promise<any> => {
    const iv = await Aes.randomKey(16);
    const cipher = await Aes.encrypt(text, key, iv);
    return { cipher, iv };
  };

  private decryptWithKey = async (encryptedData: any, key: string): Promise<string> => {
    return await Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
  };

  encrypt = async (password: string, data: any): Promise<string> => {
    const salt = this.generateSalt();
    const key = await this.generateKey(password, salt);
		const result = await this.encryptWithKey(JSON.stringify(data), key);
		result.salt = salt;
		return JSON.stringify(result);
  };

  decrypt = async (password: string, encryptedText: string): Promise<any> => {
    const encryptedData = JSON.parse(encryptedText);
		const key = await this.generateKey(password, encryptedData.salt);
    const text = await this.decryptWithKey(encryptedData, key);
    return JSON.parse(text);
  };
}
