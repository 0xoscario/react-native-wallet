/**
 * @format
 */

export default {
  get: jest.fn((url: string) => {
    if (url === 'https://ethgasstation.info/json/ethgasAPI.json') {
      return Promise.resolve({
        data: {}
      });
    }
    throw new Error('Unknown url');
  })
};
