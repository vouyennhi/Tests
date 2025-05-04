// jest.config.js
module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  roots: [
    "<rootDir>/Test-backend",
  ]
};