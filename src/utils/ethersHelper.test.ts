/**
 * @format
 */
import { ethers } from 'ethers';
import { deriveChild } from 'src/utils/ethersHelper';

describe('ethers', () => {
  test('wallet', async () => {
    const walletR1 = ethers.Wallet.createRandom();
    const walletR2 = ethers.Wallet.createRandom();
    expect(walletR1.address).not.toBe(walletR2.address);
    expect(walletR1.mnemonic).not.toBe(walletR2.mnemonic);
    const encrypt = await walletR1.encrypt('1212');
    const walletR1D = ethers.Wallet.fromEncryptedJsonSync(encrypt, '1212');
    expect(walletR1.address).toBe(walletR1D.address);

    const wallet = new ethers.Wallet('0x52388bc44e4be494f39d35dec8de04cae6243c6b6d36f29ebd3f78f692ceb96d');
    expect(wallet.address).toBe('0xE28C9C18778217DB8059A5160f829e837A79769a');
    expect(wallet.mnemonic).toBeNull();
  });

  test('deriveChild', async () => {
    const mnemonic = 'educate garage silly card fuel wife width model turkey filter meat drastic cross gap suit caught zone cube quiz pole chalk egg lock segment';
    const hdNode0 = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(deriveChild(0));
    expect(hdNode0.privateKey).toBe('0x52388bc44e4be494f39d35dec8de04cae6243c6b6d36f29ebd3f78f692ceb96d');
    expect(hdNode0.publicKey).toBe('0x02f1d4b5497c4fb6b25933a0d7e4104d134134b4a6baade334cd3498e40fe86e07');
    expect(hdNode0.address).toBe('0xE28C9C18778217DB8059A5160f829e837A79769a');

    const hdNode10 = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(deriveChild(10));
    expect(hdNode10.privateKey).toBe('0x182687af476ceb47f8cfba1dee12536e5a8d4335180b09c106c9c791d949d728');
    expect(hdNode10.publicKey).toBe('0x03847f07fdd918052c3c64bb4bcc0ee985957162f4ce71417d9415c7fd7d40b0bb');
    expect(hdNode10.address).toBe('0x5D030ECf3E51B4923D285775F2913c891B41405E');

    const hdNode19 = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(deriveChild(19));
    expect(hdNode19.privateKey).toBe('0xc88d5395213a7fe00c3c27ce82ba766838c8456fc78485f6995d5666d26b3576');
    expect(hdNode19.publicKey).toBe('0x03bc361b997298a9998af5275eb04c6c9a80e3f3a0edcce6f9f5c2c1949abe9853');
    expect(hdNode19.address).toBe('0x3F2fEc10539D13D16D83FC1c140196d9d2823396');
    
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    expect(wallet.address).toBe(hdNode0.address);
  });
});
