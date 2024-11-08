module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Tells Jest to use Babel for .js and .jsx files
  },
  testEnvironment: "node", // If you're testing Node.js APIs (for the backend)
};
