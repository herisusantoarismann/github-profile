module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "jest-transform-stub",
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|bmp|tiff)$": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$", "\\.svg$"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass|svg)$": "identity-obj-proxy",
  },
};
