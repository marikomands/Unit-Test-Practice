const successFetch = () =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ name: "John Doe", email: "john_doe@hotmail.com" }),
  });

const errorFetch = jest.fn(
  () => () =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: "Unauthorized" }),
    })
);

export { successFetch, errorFetch };
