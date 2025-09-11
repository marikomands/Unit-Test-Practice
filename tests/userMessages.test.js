import { getWelcomeMessages } from "../src/userMessages";

describe("getWelcomeMessages", () => {
  it("returns guest message when no user is provided", () => {
    expect(getWelcomeMessages(null)).toBe("Welcome, guest!");
  });

  it("returns admin message for admin users", () => {
    const user = { role: "admin" };
    expect(getWelcomeMessages(user)).toBe("Welcome back, administrator!");
  });

  it("returns member message for member users", () => {
    expect(getWelcomeMessages({ role: "member", name: "Alice" })).toBe(
      "Welcome back, Alice!"
    );
  });

  it("returns default welcome message for other roles", () => {
    expect(getWelcomeMessages({ role: "guest" })).toBe("Welcome!");
  });
});
