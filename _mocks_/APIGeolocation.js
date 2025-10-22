// __mocks__/apiMocks.js

export const mockPosition = {
  coords: {
    latitude: 51.5074,
    longitude: -0.1278,
  },
};

export const successFetchAndSaved = () =>
  Promise.resolve({
    ok: true,
    json: async () => ({ message: "Location saved successfully" }),
  });

export const successFetchAndErrorSaved = () =>
  Promise.resolve({
    ok: false,
    json: async () => ({ message: "Failed to save location" }),
  });
// 位置情報は得られて、フェッチに成功したが、処理や保存に失敗した時。API通信は取得してフェッチしている。

export const networkErrorFetch = () =>
  Promise.reject(new Error("Network error"));
//位置情報は得られたが、フェッチに失敗＝API通信が失敗した時。

export const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
