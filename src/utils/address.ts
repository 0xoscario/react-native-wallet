/**
 * @format
 */
import { ethers } from 'ethers';

export const getEthereumFullAddress = (address: string) => {
  return ethers.utils.getAddress(address);
}

export const getEthereumShortAddress = (address: string) => {
  const charactersNumber = 6;
  const checksummedAddress = ethers.utils.getAddress(address);
  const prefix = checksummedAddress.substr(0, charactersNumber + 2);
  const surfix = checksummedAddress.substr(-charactersNumber);
  return `${prefix}...${surfix}`;
}
