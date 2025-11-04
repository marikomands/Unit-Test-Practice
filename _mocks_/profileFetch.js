const successFetchAndSave = () =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ name: "John Doe", email: "john_doe@hotmail.com" }),
  });

const successFetchButAuthenticationError = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: "Unauthorized" }),
  })
);
// authentication error etc... fetched but not saved or other errors
// jesty.fn() records calls to the function for later inspection. 　非同期処理のモック関数

const networkFetchError = jest.fn(() =>
  Promise.reject(new Error("Network error"))
);
// promise.reject() creates a Promise that is rejected with the given reason. 失敗したPromiseを返す.
// new Error  = asyncronous function that simulates a network error during fetch.

export {
  successFetchAndSave,
  successFetchButSaveError,
  authenticationFetchError,
  networkFetchError,
};
