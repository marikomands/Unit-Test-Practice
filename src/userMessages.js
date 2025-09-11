//
export function getWelcomeMessages(user) {
  if (!user || !user.role) return "Welcome, guest!";
  if (user.role === "admin") return "Welcome back, administrator!";
  if (user.role === "member") return `Welcome back, ${user.name}!`;
  return "Welcome!";
}
// module.exports = { getWelcomeMessages };
