module.exports = {
  globals: {
    "vue-jest": {
      babelConfig: true,
    },
  },
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  modulePathIgnorePatterns: ["node_modules", "<rootDir>/jest/results.json"],
  transform: {
    "^.+\\.vue$": "@vue/vue2-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2|txt|md)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@thegetty/|leaflet/|vee-validate/dist/rules))",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@data/(.*)$": "<rootDir>/src/data/$1",

    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/src/**/*.(spec).js"],
  testEnvironmentOptions: { url: "http://localhost/" },
  testEnvironment: "jsdom",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "/tmp/jest-junit/index.html",
      },
    ],
    [
      "jest-junit",
      { outputDirectory: "/tmp/jest-junit", outputName: "./junit.xml" },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue,jsx,ts,tsx}",
    "!src/main.js", // No need to cover bootstrap file
    "!**/node_modules/**",
  ],
  coverageDirectory: "/tmp/jest-junit/",
};
