export const mockUserFetchSucceedResponse = {
  data: {
    name: "Kaito Mands",
    email: "mariko.mands@example.com",
    notes: "",
  },
};

export const mockUserSaveSucceedResponse = {
  data: {
    name: "Kaito Mands",
    email: "kaito.mands@example.com",
    notes: "Hello, this is a note about Kaito.",
    message: "User profile and notes saved successfully",
  },
};

// ❌ Mock error for failed POST /api/save
export const mockSaveErrorNotes = {
  response: {
    status: 400,
    data: {
      message: "Failed to save user profile and notes",
    },
  },
};
