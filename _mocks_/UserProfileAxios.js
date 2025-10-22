// __mocks__/userResponse.js

// mock success response for GET /api/user
export const mockUserFetchSucceedResponse = {
  data: {
    name: "Mariko Mands",
    email: "mariko.mands@example.com",
    notes: "Hello, this is a note about Mariko.",
  },
};

export const mockUserFetchErrorResponse = {
  response: {
    status: 500,
    data: {
      message: "Network error: Unable to fetch user data.",
    },
  },
};

// mock success response for POST /api/save
export const mockSaveSuccessNotes = {
  data: {
    name: "Mariko Mands",
    email: "mariko.mands@example.com",
    notes: "Hello, this is a note about Mariko.",
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
