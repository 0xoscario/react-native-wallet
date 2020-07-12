/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';
import { EthereumGasStation } from 'src/utils/types';

const ETHEREUM_GAS_STATION_KEY: string = 'ETHEREUM_GAS_STATION_KEY';

export class AppStorage {
  static getEthereumGasStation = async () : Promise<EthereumGasStation | null> => {
    const gasStation = await AsyncStorage.getItem(ETHEREUM_GAS_STATION_KEY);
    return gasStation ? JSON.parse(gasStation) : null;
  };

  static setEthereumGasStation = async (gasStation?: EthereumGasStation) : Promise<void> => {
    if (gasStation) {
      await AsyncStorage.setItem(ETHEREUM_GAS_STATION_KEY, JSON.stringify(gasStation));
    } else {
      await AsyncStorage.removeItem(ETHEREUM_GAS_STATION_KEY);
    }
  };
}
