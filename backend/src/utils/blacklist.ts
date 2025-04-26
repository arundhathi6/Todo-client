const tokenBlacklist = new Set<string>();

export const addToBlacklist = (token: string) => {
  tokenBlacklist.add(token);
};

export const isBlacklisted = (token: string) => {
  return tokenBlacklist.has(token);
};
