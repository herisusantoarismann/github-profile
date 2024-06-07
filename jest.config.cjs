module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$", "\\.svg$"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy",
  },
};
