export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // This is a common pattern, if you're using `@`
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
  },
  
  // Make sure to also configure this for your aliases
  moduleDirectories: ['node_modules', 'src'], 
};

