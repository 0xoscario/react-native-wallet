/**
 * @format
 */
import { ethers } from 'ethers';

const HardenedBit = 0x80000000;

export const deriveChild = function(index: number): string {
  if (index >= HardenedBit) { throw new Error('invalid path index'); }
  const components = ethers.utils.defaultPath.split('/');
  components[components.length - 1] = `${index}`;
  return components.join('/');
};
