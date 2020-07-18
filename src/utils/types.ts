/**
 * @format
 */

export interface EthereumGasStation {
  retrievedTimestamp: number; // Api retrieved timestamp(in ms)
  safeLow: number; // Recommended safe(expected to be mined in < 30 minutes) gas price in Gwei
  average: number; // Recommended average(expected to be mined in < 5 minutes) gas price in Gwei
  fast: number; // Recommended fast(expected to be mined in < 2 minutes) gas price in Gwei
  fastest: number; // Recommended fastest(expected to be mined in < 30 seconds) gas price in Gwei
  blockTime: number; // Average time(in seconds) to mine one single block
  blockNum: number; // Latest block number
}
