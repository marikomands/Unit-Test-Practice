export const successFetch = () =>
  Promise.resolve({
    ok: true,
    json: async () => [
      { id: 1, text: "Mocked Task" },
      { id: 2, text: "Collecting Kids" },
      { id: 3, text: "Cook Dinner" },
    ],
  });

export const errorFetch = () =>
  Promise.resolve({
    ok: false,
    json: async () => ({ message: "Failed to fetch" }),
  });
