module.exports = {
  testMatch: ['<rootDir>/pages/**/*.test.tsx','<rootDir>/pages/**/*.test.ts'],
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['<rootDir>/jest-puppeteer-setup.js'],
  transform: {
    '^.+\\.ts$': 'babel-jest',
    '^.+\\.tsx$': 'babel-jest',
  },
  globals: {
    PREFIX_URL: 'http://localhost:8081',
  },
};
